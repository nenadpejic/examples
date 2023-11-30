import { ComponentProps, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import { INPUT_BASE_STYLE } from './shared/BasicInput'
import BasicLabel from './shared/BasicLabel'

type Props = ComponentProps<'textarea'> & {
  className?: string
  full?: boolean
  textareaClassName?: string
  label?: string
}

const TextArea = ({
  className,
  full,
  textareaClassName,
  label,
  ...rest
}: Props) => {
  const id = useMemo(() => crypto.randomUUID(), [])

  return (
    <div className={className}>
      {label && (
        <BasicLabel htmlFor={id} required={rest.required}>
          {label}
        </BasicLabel>
      )}

      <textarea
        id={label && id}
        className={twMerge(
          INPUT_BASE_STYLE,
          textareaClassName,
          full && 'w-full',
        )}
        cols={22}
        rows={3}
        {...rest}
      />
    </div>
  )
}

export default TextArea
