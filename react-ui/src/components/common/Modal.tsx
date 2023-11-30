import { ReactNode, useEffect } from 'react'
import FocusTrap from './FocusTrap'
import { twMerge } from 'tailwind-merge'

type Props = {
  children: ReactNode
  className?: string
  onClose: () => void
  open: boolean
}

const Modal = ({ children, className, onClose, open }: Props) => {
  useEffect(() => {
    if (open) {
      document.body.style.setProperty('overflow', 'hidden')
    } else {
      document.body.style.removeProperty('overflow')
    }
  }, [open])

  if (!open) return null

  return (
    <FocusTrap>
      <div className="flex flex-col items-center fixed z-10 inset-0 overflow-y-auto">
        <div
          className="fixed -z-[1] inset-0 bg-opacity-50 bg-gray-900 backdrop-blur-sm"
          aria-hidden={true}
          onClick={onClose}
        />

        <div
          className={twMerge(
            'm-4 bg-white rounded-md px-6 py-4 md:px-8 md:py-6 shadow-md',
            className,
          )}
          aria-modal={true}
        >
          {children}
        </div>
      </div>
    </FocusTrap>
  )
}

export default Modal
