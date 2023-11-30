import { ComponentProps, useMemo } from 'react'
import { IconName } from '../Icon'
import BasicInput from './shared/BasicInput'
import BasicLabel from './shared/BasicLabel'

type Props = ComponentProps<'input'> & {
  className?: string
  full?: boolean
  iconBefore?: IconName
  inputClassName?: string
  label?: string
}

const NumberInput = ({ className, inputClassName, label, ...rest }: Props) => {
  const id = useMemo(() => crypto.randomUUID(), [])

  return (
    <div className={className}>
      {label && (
        <BasicLabel htmlFor={id} required={rest.required}>
          {label}
        </BasicLabel>
      )}

      <BasicInput
        id={label && id}
        className={inputClassName}
        type="number"
        step={1}
        {...rest}
      />
    </div>
  )
}

export default NumberInput
