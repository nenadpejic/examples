import { useRef } from 'react'

type Props = {
  caret?: boolean
  inputText?: string
  labelText?: string
  leadingIcon?: any
  supportingText?: any
  trailingIcon?: any
  variant?: 'filled' | 'outlined'
}

const TextField = ({
  caret = false,
  inputText,
  labelText,
  leadingIcon,
  supportingText,
  trailingIcon,
  variant = 'outlined',
}: Props) => {
  const idRef = useRef(Math.random().toString())

  return (
    <div>
      {labelText && (
        <label htmlFor={idRef.current}>
          {labelText}
          {caret && <span>*</span>}
        </label>
      )}

      <div>
        {leadingIcon && leadingIcon}
        <input id={idRef.current} type="text" value={inputText} />
        {trailingIcon && trailingIcon}
      </div>

      {supportingText && <p>{supportingText}</p>}
    </div>
  )
}

export default TextField
