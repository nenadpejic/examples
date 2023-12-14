'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <p>The current theme is: {theme}</p>
      <button className="block" onClick={() => setTheme('system')}>
        System
      </button>
      <button className="block" onClick={() => setTheme('light')}>
        Light Mode
      </button>
      <button className="block" onClick={() => setTheme('dark')}>
        Dark Mode
      </button>
    </div>
  )
}

export default ThemeSwitch
