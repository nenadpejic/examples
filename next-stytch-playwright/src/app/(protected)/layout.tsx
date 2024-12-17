import Navigation from '@/components/navigation'
import { ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

const ProtectedLayout = ({ children }: Props) => {
  return (
    <>
      <Navigation />
      {children}
    </>
  )
}

export default ProtectedLayout
