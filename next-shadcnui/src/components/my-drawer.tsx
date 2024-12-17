'use client'

import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Props = {}

const MyDrawer = (props: Props) => {
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (open) {
      document.body.setAttribute(
        'style',
        'position: fixed !important; left: 0px; right: 0px; top: 0px; height: auto; pointer-events: none;',
      )
    } else {
      document.body.removeAttribute('style')
    }
  }, [open])

  return (
    <>
      <button onClick={handleOpen}>Open</button>

      {open &&
        createPortal(
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-50 bg-black/80 pointer-events-auto"
              onClick={handleClose}
            />

            {/* Content */}
            <div className="fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background pointer-events-auto">
              {/* Header */}
              <div className="p-4 text-center md:text-start">
                This is the Header?
              </div>

              {/* Main */}
              <div className="m-4 h-[400px]">
                <ul className="overflow-y-auto h-[inherit]">
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                  <li>Item</li>
                </ul>
              </div>

              {/* Footer */}
              <div className="p-4 mt-auto">Hello from Footer!</div>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}

export default MyDrawer
