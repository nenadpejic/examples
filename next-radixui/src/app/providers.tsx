'use client'

import { Theme, ThemePanel } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider attribute="class">
      <Theme>
        {children}
        <ThemePanel />
      </Theme>
    </ThemeProvider>
  )
}

export default Providers
