import { ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  lg: 'text-2xl',
  md: 'text-xl font-semibold',
  sm: 'text-lg font-semibold',
}

type Props = {
  as?: ElementType
  children?: ReactNode
  className?: string
  variant?: keyof typeof variants
}

const Heading = ({
  as: Element = 'h1',
  children,
  className,
  variant = 'md',
}: Props) => {
  return (
    <Element className={twMerge('text-gray-900', variants[variant], className)}>
      {children}
    </Element>
  )
}

export default Heading
