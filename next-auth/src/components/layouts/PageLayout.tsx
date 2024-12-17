import { ReactNode } from 'react'
import Header from '../Header/Header'

type Props = {
  children?: ReactNode
}

const PageLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}

export default PageLayout
