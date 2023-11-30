import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

type Props = ComponentProps<'button'> & {
  children?: ReactNode
  className?: string
  full?: boolean
}

const Button = ({ children, className, full, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        'bg-gray-800 text-gray-100 px-4 py-2 font-medium',
        full && 'w-full',
        className,
      )}
      type="button"
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
