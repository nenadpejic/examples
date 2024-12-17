'use client'

import { useStytchUser } from '@stytch/nextjs'
import Link from 'next/link'

const Navigation = () => {
  const { user, isInitialized } = useStytchUser()

  console.log({ user, isInitialized })

  return (
    <header>
      <nav className="m-4 flex items-center gap-4">
        <Link className="mr-auto hover:underline" href="/">
          Home
        </Link>
        {!user && isInitialized ? (
          <>
            <Link className="hover:underline" href="/authenticate">
              Log in
            </Link>
            <Link className="hover:underline" href="/">
              Sign up
            </Link>
          </>
        ) : (
          <>
            <p>{user?.emails[0].email}</p>
            <Link className="hover:underline" href="/">
              Log out
            </Link>
          </>
        )}
      </nav>
    </header>
  )
}

export default Navigation
