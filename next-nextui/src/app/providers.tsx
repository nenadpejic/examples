'use client'

import { NextUIProvider } from '@nextui-org/system'
import { ReactNode } from 'react'

type ProvidersProps = {
  children: ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return <NextUIProvider>{children}</NextUIProvider>
}
