# next-shadcnui

Example project showcasing [ShadcnUI](https://react.dev/) for building front-end apps.

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app), by running `$ npx create-next-app`.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter
- [Typescript](https://www.typescriptlang.org/) - Static types
- [Next](https://nextjs.org/) - Framework
- [Tailwindcss](https://tailwindcss.com/) - Styling
- [ShadcnUI](https://ui.shadcn.com/) - UI
  - [Lucide](https://lucide.dev/) - Icons
  - [CVA](https://cva.style/docs) - Variants type safety
  - [clsx](https://github.com/lukeed/clsx#readme) - constructing className strings conditionally
  - [tailwind-merge](https://github.com/dcastil/tailwind-merge) - merge className strings
  - [tailwindcss-animate](https://www.npmjs.com/package/tailwindcss-animate) - animation className strings
  - [Next Themes](https://github.com/pacocoursey/next-themes) - Theme switching
  - [TW Colors](https://github.com/L-Blondy/tw-colors) - Theme creation

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd next-shadcnui
```

- Make sure to use the node version specified in `.nvmrc`. It is recommended to use `nvm` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

```sh
$ nvm use
```

- Intall dependencies. This project uses `npm`. [Official npm docs](https://www.npmjs.com/)

```sh
$ npm install
```

## Development

- Run local dev server

```sh
$ npm run dev
```

## Build and Test

- Bundle for production

```sh
$ npm run build
```

## Contributing

- Create a new feature branch

```sh
$ git checkout -b feat/<feature-name>
```

- Commit messages need to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

```sh
$ git add .
$ git commit -m '<type>[optional scope]: <description>'
```

- Open a pull request and once approved merge by squashing commits

- Optional: Rebase beforehand

```sh
$ git rebase master HEAD~<number-of-commits> -i
```

## Deployment

## Guide

1. Run cli

```sh
npx shadcn-ui@latest init
```

2. Configure components.json

```
Would you like to use TypeScript (recommended)? no / yes
Which style would you like to use? › Default
Which color would you like to use as base color? › Slate
Where is your global CSS file? › › app/globals.css
Do you want to use CSS variables for colors? › no / yes
Where is your tailwind.config.js located? › tailwind.config.js
Configure the import alias for components: › @/components
Configure the import alias for utils: › @/lib/utils
Are you using React Server Components? › no / yes
```

3. [optional] Fonts

```tsx
// layout.tsx
import '@/styles/globals.css'
import { Inter as FontSans } from 'next/font/google'

import { cn } from '../@/lib/utils'

export const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        ...
      </body>
    </html>
  )
}
```

```js
// tailwind.config.js
const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['app/**/*.{ts,tsx}', 'components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
      },
    },
  },
}
```

4. Theme switching

```sh
npm i next-themes
```

```tsx
// src/components/ThemeProvider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
```

```tsx
// src/components/ModeToggle.tsx
'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ModeToggle() {
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
```

5. Theme creation

```sh
npm i tw-colors
```

```ts
const { createThemes } = require('tw-colors')

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  plugins: [
    createThemes({
      light: {
        primary: {
          DEFAULT: 'hsl(220.9 39.3% 11%)',
          foreground: 'hsl(210 20% 98%)',
        },
      },
      dark: {
        primary: {
          DEFAULT: 'hsl(210 20% 98%)',
          foreground: 'hsl(220.9 39.3% 11%)',
        },
      },
    }),
  ],
}
```

6. Add component via cli or manually

```sh
npx shadcn-ui@latest add button
```
