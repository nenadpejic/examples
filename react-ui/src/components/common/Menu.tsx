import { ReactNode, useRef, useState } from 'react'
import { twMerge } from 'tailwind-merge'

type MenuItem = {
  label: string
  onClick: () => void
}

type Placement = 'bottom-start' | 'bottom-center' | 'bottom-end'

type Props = {
  anchorEl: ReactNode | ((props: { open: boolean }) => JSX.Element)
  children?: ReactNode
  className?: string
  menuItems?: MenuItem[]
  panelClassName?: string
  placement?: Placement
}

const Menu = ({
  anchorEl,
  children,
  className,
  menuItems,
  panelClassName,
  placement = 'bottom-start',
}: Props) => {
  const MenuElContainerRef = useRef<HTMLDivElement>(null)
  const anchorElContainerRef = useRef<HTMLDivElement>(null)
  const [open, setOpen] = useState<boolean>(false)

  return (
    <>
      {open && (
        <div
          className="absolute z-[9] inset-0"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={twMerge('inline-block relative', className)}
        ref={MenuElContainerRef}
      >
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
              anchorElContainerRef.current.offsetHeight,
            )}
          >
            <ul className="py-2">
              {menuItems?.map((menuItem, i) => (
                <li key={i}>
                  <button
                    className="w-full text-start px-4 py-1 hover:bg-gray-100 text-gray-900"
                    type="button"
                    onClick={() => {
                      menuItem.onClick()
                      setOpen(false)
                    }}
                  >
                    {menuItem.label}
                  </button>
                </li>
              ))}
              {children}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}

export default Menu

const getPanelPositionStyle = (
  placement: Placement,
  anchorElHeight: number,
) => {
  switch (placement) {
    case 'bottom-start':
      return {
        top: anchorElHeight + 4,
        right: 'unset',
        bottom: 'unset',
        left: 0,
      }
    case 'bottom-center':
      return {
        top: anchorElHeight + 4,
        right: 'unset',
        bottom: 'unset',
        left: '50%',
        transform: 'translateX(-50%)',
      }
    case 'bottom-end':
      return {
        top: anchorElHeight + 4,
        right: 0,
        bottom: 'unset',
        left: 'unset',
      }
    default:
      return {
        top: anchorElHeight + 4,
        right: 'unset',
        bottom: 'unset',
        left: 0,
      }
  }
}
