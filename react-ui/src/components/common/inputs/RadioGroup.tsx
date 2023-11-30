import { ChangeEvent, useMemo, useState } from 'react'
import Icon from '../Icon'
import BasicLabel from './shared/BasicLabel'
import { Option } from './shared/types'

type Props = {
  label?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  options: Option[]
  required?: boolean
  value?: string
}

const RadioGroup = ({ label, onChange, options, required, value }: Props) => {
  const [checkedValue, setCheckedValue] = useState('')

  const id = useMemo(() => crypto.randomUUID(), [])

  return (
    <div>
      {label && <BasicLabel required={required}>{label}</BasicLabel>}

      <div>
        {options.map((option, i) => {
          return (
            <label
              key={option.value}
              className="flex items-center w-fit hover:cursor-pointer text-gray-900"
              htmlFor={`${i}-${id}`}
            >
              <input
                id={`${i}-${id}`}
                className="hover:cursor-pointer hidden"
                type="radio"
                name={id}
                value={option.value}
                checked={(value || checkedValue) === option.value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target
                  onChange?.(e) || setCheckedValue(value)
                }}
              />
              <Icon
                className="fill-blue-500"
                name={
                  (value || checkedValue) === option.value
                    ? 'radioButtonChecked'
                    : 'radioButtonUnchecked'
                }
              />
              <span className="ml-2 text-gray-900">{option.label}</span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

export default RadioGroup
