import { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type Placement = 'bottom-start' | 'bottom-center' | 'bottom-end'

type Props = {
  anchorEl: ReactNode | ((props: { open: boolean }) => JSX.Element)
  children?: ReactNode
  className?: string
  gap?: number
  panelClassName?: string
  placement?: Placement
}

const Popper = ({
  anchorEl,
  children,
  className,
  gap = 4,
  panelClassName,
  placement = 'bottom-start',
}: Props) => {
  const PopperElContainerRef = useRef<HTMLDivElement>(null)
  const anchorElContainerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <div className={twMerge('relative', className)} ref={PopperElContainerRef}>
      <div ref={anchorElContainerRef} onClick={() => setOpen((pV) => !pV)}>
        {typeof anchorEl === 'function' ? anchorEl({ open }) : anchorEl}
      </div>

      {anchorElContainerRef.current && open && (
        <div
          className={twMerge(
            `absolute z-10 border border-gray-500 shadow-md bg-white`,
            panelClassName,
          )}
          style={getPanelPositionStyle(
            placement,
            gap,
            anchorElContainerRef.current.offsetHeight,
          )}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default Popper

const getPanelPositionStyle = (
  placement: Placement,
  gap: number,
  anchorElHeight: number,
) => {
  switch (placement) {
    case 'bottom-start':
      return {
        top: anchorElHeight + gap,
        right: 'unset',
        bottom: 'unset',
        left: 0,
      }
    case 'bottom-center':
      return {
        top: anchorElHeight + gap,
        right: 'unset',
        bottom: 'unset',
        left: '50%',
        transform: 'translateX(-50%)',
      }
    case 'bottom-end':
      return {
        top: anchorElHeight + gap,
        right: 0,
        bottom: 'unset',
        left: 'unset',
      }
    default:
      return {
        top: anchorElHeight + gap,
        right: 'unset',
        bottom: 'unset',
        left: 0,
      }
  }
}
