import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon, { IconName } from '../Icon'

type Props = ComponentProps<'button'> & {
  active?: boolean
  name: IconName
  round?: boolean
}

const IconButton = ({ active, name, round, ...rest }: Props) => {
  return (
    <button
      className={twMerge(
        'block',
        active && 'bg-gray-200',
        round && 'rounded-full',
      )}
      {...rest}
    >
      <Icon name={name} />
    </button>
  )
}

export default IconButton
