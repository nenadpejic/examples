import { useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import Chip from '../Chip'
import BasicInput from './shared/BasicInput'
import BasicLabel from './shared/BasicLabel'
import { Option } from './shared/types'

const menuItemClasses = 'px-4 py-1 text-gray-900'

type CommonProps = {
  full?: boolean
  label?: string
  options: Option[]
  placeholder?: string
  required?: boolean
}

type Props = CommonProps &
  (
    | {
        multiple?: false
        onChange?: (value: string) => void
        value?: string
      }
    | {
        multiple: true
        onChange?: (value: string[]) => void
        value?: string[]
      }
  )

const Autocomplete = ({
  full,
  label,
  multiple,
  onChange,
  options,
  placeholder,
  required,
  value,
}: Props) => {
  const id = useMemo(() => crypto.randomUUID(), [])
  const [query, setQuery] = useState('')
  const [selectedOptionValues, setSelectedOptionValues] = useState<
    string | string[]
  >(multiple ? [] : '')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filteredOptions = useMemo(
    () =>
      query === ''
        ? options
        : options.filter((option) => {
            return option.label.toLowerCase().includes(query.toLowerCase())
          }),
    [options, query],
  )

  const toggleOption = (optionValue: string) => {
    if (!multiple) return
    if (!Array.isArray(selectedOptionValues)) return
    if (Array.isArray(value) || value === undefined) {
      let newSelectedOptionValues
      if ((value || selectedOptionValues).some((v) => v === optionValue)) {
        newSelectedOptionValues = (value || selectedOptionValues).filter(
          (v) => v !== optionValue,
        )
      } else {
        newSelectedOptionValues = [
          ...(value || selectedOptionValues),
          optionValue,
        ]
      }
      onChange?.(newSelectedOptionValues) ||
        setSelectedOptionValues(newSelectedOptionValues)
    }
  }

  return (
    <div>
      {label && (
        <BasicLabel htmlFor={id} required={required}>
          {label}
        </BasicLabel>
      )}

      <div>
        <div className={twMerge('relative inline-block', full && 'w-full')}>
          {multiple &&
            Array.isArray(selectedOptionValues) &&
            (Array.isArray(value) || value === undefined) && (
              <ul className="flex gap-2 flex-wrap max-h-[80px] overflow-auto mb-2">
                {(value || selectedOptionValues).map((v) => {
                  const label =
                    options.find((o) => o.value === v)?.label || 'unknown'
                  return (
                    <li key={v}>
                      <Chip label={label} onDelete={() => toggleOption(v)} />
                    </li>
                  )
                })}
              </ul>
            )}

          <BasicInput
            id={id}
            className="w-full"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setIsMenuOpen(true)
            }}
            onClick={() => setIsMenuOpen(true)}
            onFocus={() => setIsMenuOpen(true)}
            onBlur={() => {
              setIsMenuOpen(false)
              if (!options.some((option) => option.label === query)) {
                !multiple && (onChange?.('') || setSelectedOptionValues(''))
                setQuery('')
              }
            }}
            placeholder={placeholder}
          />

          {isMenuOpen && (
            <ul
              className={twMerge(
                'absolute left-0 max-h-[100px] overflow-auto mt-1 z-10 border border-gray-500 shadow-md bg-white py-2',
                full && 'right-0',
              )}
            >
              {!filteredOptions.length && (
                <li className={menuItemClasses}>No options</li>
              )}
              {filteredOptions.map((filteredOption) => {
                return (
                  <li
                    key={filteredOption.value}
                    className={twMerge(
                      `${menuItemClasses} hover:bg-gray-100 hover:cursor-pointer`,
                      Array.isArray(selectedOptionValues) &&
                        (Array.isArray(value) || value === undefined) &&
                        (value || selectedOptionValues)?.some(
                          (v) => v === filteredOption.value,
                        ) &&
                        'bg-gray-300 hover:bg-gray-400',
                    )}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      multiple && toggleOption(filteredOption.value)
                      !multiple &&
                        (onChange?.(filteredOption.value) ||
                          setSelectedOptionValues(filteredOption.value))
                      !multiple && setQuery(filteredOption.label)
                      setIsMenuOpen(false)
                    }}
                  >
                    {filteredOption.label}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}

export default Autocomplete
