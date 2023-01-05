import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-react/dist/esm/common/theming/defaultThemes';
import { useState } from 'react';
import Dialog from './Dialog';
import { supaClient } from './supa-client';

export default function Login() {
  const [open, setOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'sign_in' | 'sign_up'>('sign_in');
  return (
    <>
      <div className='flex m-4 place-items-center'>
        <button
          onClick={() => {
            setOpen(true);
            setAuthMode('sign_in');
          }}
        >
          Login
        </button>{' '}
        <span className='p-2'> or </span>{' '}
        <button
          onClick={() => {
            setOpen(true);
            setAuthMode('sign_up');
          }}
        >
          Sign Up
        </button>
      </div>
      <Dialog
        open={open}
        dialogStateChange={(open) => setOpen(open)}
        contents={
          <>
            <Auth supabaseClient={supaClient} view={authMode} appearance={{
              theme: ThemeSupa,
              className: {
                container: 'login-form-container',
                label: 'login-form-label',
                button: 'login-form-button',
                input: 'login-form-input'
              }
            }} />
          </>
        }
      />
    </>
  );
}
