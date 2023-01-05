create extension ltree;

create table user_profiles (
  user_id uuid primary key references auth.users (id) not null,
  username text unique not null,
  CONSTRAINT proper_username CHECK (username ~* '^[a-zA-Z0-9_]+$'),
  CONSTRAINT username_length CHECK (
    char_length(username) > 3
    and char_length(username) < 15
  )
);

create table posts (
  id uuid primary key default uuid_generate_v4() not null,
  user_id uuid references auth.users (id) not null,
  created_at timestamp with time zone default now() not null,
  path ltree not null
);

create table post_score (
  post_id uuid primary key references posts (id) not null,
  score int not null
);

create table post_contents (
  id uuid primary key default uuid_generate_v4() not null,
  user_id uuid references posts (id) not null,
  post_id uuid references posts (id) not null,
  title text,
  content text,
  created_at timestamp with time zone default now() not null
);

create table post_votes (
  id uuid primary key default uuid_generate_v4() not null,
  post_id uuid references posts (id) not null,
  user_id uuid references auth.users (id) not null,
  vote_type text not null,
  unique (post_id, user_id)
);

alter table
  user_profiles enable row level security;

CREATE POLICY "all can see" ON "public"."user_profiles" AS PERMISSIVE FOR
SELECT
  TO public USING (true);

CREATE POLICY "users can insert" ON "public"."user_profiles" AS PERMISSIVE FOR
INSERT
  TO public WITH CHECK (auth.uid() = user_id);

CREATE POLICY "owners can update" ON "public"."user_profiles" AS PERMISSIVE FOR
UPDATE
  TO public USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);