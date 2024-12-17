import { ThemeProvider } from '@/components/ThemeProvider'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}

export default Providers
