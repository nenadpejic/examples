import { ComponentProps, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Icon from '../Icon'
import { INPUT_BASE_STYLE } from './shared/BasicInput'
import BasicLabel from './shared/BasicLabel'
import { Option } from './shared/types'

type Props = ComponentProps<'select'> & {
  full?: boolean
  label?: string
  options: Option[]
  value?: string
}

const Select = ({ full, label, onChange, options, value, ...rest }: Props) => {
  const id = useMemo(() => crypto.randomUUID(), [])
  const [selectedValue, setSelectedValue] = useState('')

  return (
    <div>
      {label && (
        <BasicLabel htmlFor={id} required={rest.required}>
          {label}
        </BasicLabel>
      )}

      <div>
        <div className={twMerge('relative inline-block', full && 'w-full')}>
          <select
            id={id}
            className={twMerge(
              INPUT_BASE_STYLE,
              'appearance-none w-full pr-9',
              !value && !selectedValue && 'text-transparent',
            )}
            onChange={(e) => {
              onChange?.(e) || setSelectedValue(e.target.value)
            }}
            value={value || selectedValue}
            {...rest}
          >
            <option key={''} value={''} className="text-gray-500 italic">
              None
            </option>
            {options.map((option) => (
              <option
                key={option.value}
                className="text-gray-900"
                value={option.value}
              >
                {option.label}
              </option>
            ))}
          </select>
          <Icon
            className="absolute right-0 top-1/2 -translate-y-1/2 mr-1"
            name="keyboardArrowDown"
          />
        </div>
      </div>
    </div>
  )
}

export default Select
