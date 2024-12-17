import { Switch as HUISwitch } from '@headlessui/react'
import { useState } from 'react'

const Switch = () => {
  const [enabled, setEnabled] = useState(false)

  return (
    <HUISwitch
      checked={enabled}
      onChange={setEnabled}
      className={`relative inline-flex items-center rounded-full`}
    >
      <span className="sr-only">Enable notifications</span>
      <span
        className={`${
          enabled ? 'bg-white text-black' : 'bg-purple-900 text-white'
        } px-[10px] py-2 transform transition`}
      >
        Option A
      </span>
      <span
        className={`${
          !enabled ? 'bg-white text-black' : 'bg-purple-900 text-white'
        } px-[10px] py-2 transform transition`}
      >
        Option B
      </span>
    </HUISwitch>
  )
}

export default Switch
