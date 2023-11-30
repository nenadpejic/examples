import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon, { IconName } from '../../Icon'

export const INPUT_BASE_STYLE =
  'border bg-gray-50 border-gray-400 px-4 py-2 rounded-md focus:outline-gray-500 text-gray-900 placeholder:text-gray-400'

type Props = ComponentProps<'input'> & {
  full?: boolean
  iconBefore?: IconName
}

const BasicInput = (props: Props) =>
  props.iconBefore ? (
    <div className="relative">
      {props.iconBefore && (
        <Icon
          className="absolute top-1/2 -translate-y-1/2 left-2 pointer-events-none"
          name={props.iconBefore}
        />
      )}
      <Input {...props} />
    </div>
  ) : (
    <Input {...props} />
  )

export default BasicInput

const Input = ({ id, iconBefore, full, className, ...rest }: Props) => (
  <input
    id={id}
    className={twMerge(
      INPUT_BASE_STYLE,
      iconBefore && 'pl-10',
      full && 'w-full',
      className,
    )}
    type="text"
    {...rest}
  />
)
