import { ReactNode, useEffect, useRef } from 'react'

const focusableElementSelectors = [
  '[tabindex]:not([tabindex="-1"])',
  'a',
  'button',
  'input',
  'select',
  'textarea',
]

type Props = {
  autoFocusFirstElement?: boolean
  children?: ReactNode
}

const FocusTrap = ({ autoFocusFirstElement = true, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const firstElementRef = useRef<HTMLElement>()
  const lastElementRef = useRef<HTMLElement>()

  useEffect(() => {
    const focusableElements =
      containerRef.current?.querySelectorAll<HTMLElement>(
        focusableElementSelectors.join(', '),
      )

    firstElementRef.current = focusableElements?.item(0)
    lastElementRef.current = focusableElements?.item(
      focusableElements.length - 1,
    )

    if (autoFocusFirstElement) {
      firstElementRef.current?.focus()
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      const isTabPressed = e.key === 'Tab'
      const isShiftPressed = e.shiftKey

      if (!firstElementRef.current || !lastElementRef.current) {
        return
      }

      if (
        isTabPressed &&
        isShiftPressed &&
        document.activeElement === firstElementRef.current
      ) {
        e.preventDefault()
        lastElementRef.current.focus()
      }
      if (
        isTabPressed &&
        !isShiftPressed &&
        document.activeElement === lastElementRef.current
      ) {
        e.preventDefault()
        firstElementRef.current.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => document.removeEventListener('keydown', handleKeyDown)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <div ref={containerRef}>{children}</div>
}

export default FocusTrap
