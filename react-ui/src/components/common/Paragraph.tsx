import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

const variants = {
  lg: 'text-base font-normal',
  'lg-b': 'text-base font-semibold',
  md: 'text-sm',
  'md-b': 'text-sm font-semibold',
  sm: 'text-xs',
  'sm-b': 'text-xs font-semibold',
}

type Props = {
  children?: ReactNode
  className?: string
  ellipsis?: boolean
  variant?: keyof typeof variants
}

const Paragraph = ({
  children,
  className,
  ellipsis,
  variant = 'md',
}: Props) => {
  return (
    <p
      className={twMerge(
        'text-gray-900',
        variants[variant],
        ellipsis && 'whitespace-nowrap overflow-hidden overflow-ellipsis',
        className,
      )}
    >
      {children}
    </p>
  )
}

export default Paragraph
