import { ComponentProps, useMemo, useState } from 'react'
import Icon from '../Icon'

type Props = ComponentProps<'input'> & {
  label?: string
}

const Checkbox = ({
  checked,
  className,
  defaultChecked,
  label,
  onChange,
  required,
  ...rest
}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean>(!!defaultChecked)

  const id = useMemo(() => Math.random().toString().slice(2, 6), [])

  return (
    <div className={className}>
      <label
        className="inline-flex items-center hover:cursor-pointer"
        htmlFor={id}
      >
        <input
          id={id}
          className="hidden"
          type="checkbox"
          checked={checked || isChecked}
          onChange={(e) => {
            onChange?.(e) || setIsChecked(e.target.checked)
          }}
          {...rest}
        />
        <Icon
          className="fill-blue-500"
          name={checked || isChecked ? 'checkBox' : 'checkBoxBlank'}
        />

        {label && <span className="ml-2 text-gray-900">{label}</span>}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
    </div>
  )
}

export default Checkbox
