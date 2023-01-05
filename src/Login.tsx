import { useState } from 'react'
import Dialog from './Dialog'

export default function Login() {
  const [open, setOpen] = useState(false)
  const [authState, setAuthState] = useState<'sign_in' | 'sign_up'>('sign_in')
  return (
    <>
      <div>
        <button
          onClick={() => {
            setOpen(true)
            setAuthState('sign_in')
          }}
        >
          Login
        </button>{' '}
        <span> or </span>{' '}
        <button
          onClick={() => {
            setOpen(true)
            setAuthState('sign_up')
          }}
        >
          Sign Up
        </button>
      </div>
      <Dialog open={false} contents={<>Dialog contents</>} />
    </>
  )
}
