import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MessageBoard from "./MessageBoard";
import AllPosts from "./AllPosts";
import PostView from "./PostView";
import Welcome from "./Welcome";
import NavBar from "./NavBar";
import { SupashipUserInfo, useSession } from "./use-session";
import { createContext } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <MessageBoard />,
        children: [
          {
            path: ":pageNumber",
            element: <AllPosts />,
          },
          {
            path: "post/:postId",
            element: <PostView />,
          },
        ],
      },
      {
        path: "welcome",
        element: <Welcome />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

export const UserContext = createContext<SupashipUserInfo>({
  profile: null,
  session: null
})

function Layout() {
  const supashipUserInfo = useSession();
  return (
    <UserContext.Provider value={supashipUserInfo}>
      <NavBar />
      <Outlet />
    </UserContext.Provider>
  );
}
