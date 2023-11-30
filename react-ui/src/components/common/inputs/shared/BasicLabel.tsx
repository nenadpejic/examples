import { ComponentProps } from 'react'

type Props = ComponentProps<'label'> & { required?: boolean }

const BasicLabel = ({ children, required, ...rest }: Props) => {
  return (
    <label className="inline-block mb-1 text-gray-900" {...rest}>
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  )
}

export default BasicLabel
