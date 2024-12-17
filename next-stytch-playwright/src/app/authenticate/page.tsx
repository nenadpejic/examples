'use client'

import { StytchLogin, useStytch, useStytchUser } from '@stytch/nextjs'
import { Products } from '@stytch/vanilla-js'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const REDIRECT_URL = 'http://localhost:3000/authenticate'

const config = {
  products: [Products.emailMagicLinks],
  emailMagicLinksOptions: {
    loginRedirectURL: REDIRECT_URL,
    loginExpirationMinutes: 60,
    signupRedirectURL: REDIRECT_URL,
    signupExpirationMinutes: 60,
  },
}

export default function Authenticate() {
  const { user, isInitialized } = useStytchUser()
  const stytch = useStytch()
  const searchParams = useSearchParams()
  const router = useRouter()

  console.log('router', router)

  useEffect(() => {
    if (stytch && !user && isInitialized) {
      const token = searchParams.get('token')
      const tokenType = searchParams.get('stytch_token_type')
      if (token && tokenType === 'magic_links') {
        stytch.magicLinks.authenticate(token, {
          session_duration_minutes: 60,
        })
      }
    }
  }, [isInitialized, router, stytch, user])

  useEffect(() => {
    if (isInitialized && user) {
      // Redirect the user to an authenticated page if they are already logged in
      router.replace('/dashboard')
    }
  }, [user, isInitialized, router])

  return (
    <StytchLogin
      config={config}
      // TODO: figure out how styles are used
      // styles={styles}
    />
  )
}
