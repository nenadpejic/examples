'use client'

import { StytchProvider } from '@stytch/nextjs'
import { createStytchUIClient } from '@stytch/nextjs/dist/index.ui'
import { ReactNode } from 'react'

// optional object for configuring SDK cookie behavior, currently showing defaults
const stytchOptions = {
  cookieOptions: {
    opaqueTokenCookieName: 'stytch_session',
    jwtCookieName: 'stytch_session_jwt',
    path: '',
    availableToSubdomains: false,
    domain: '',
  },
}

const stytchClient = createStytchUIClient(
  process.env.NEXT_PUBLIC_STYTCH_PUBLIC_TOKEN || '',
  stytchOptions,
)

type Props = {
  children?: ReactNode
}

const Providers = ({ children }: Props) => {
  return <StytchProvider stytch={stytchClient}>{children}</StytchProvider>
}

export default Providers
