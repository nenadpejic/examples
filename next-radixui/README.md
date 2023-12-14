# next-radixui

Example project showcasing [RadixUI](https://www.radix-ui.com//) for building front-end apps.

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
- [RadixUI](https://www.radix-ui.com/) - UI
- [Next Themes](https://github.com/pacocoursey/next-themes) - Theme switching

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd next-radixui
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

1. Install

```sh
npm install @radix-ui/themes
```

2. Import css

```sh
import '@radix-ui/themes/styles.css'
```

3. Add provider

```tsx
import { Theme, ThemePanel } from '@radix-ui/themes'

export default function () {
  return (
    <html>
      <body>
        <Theme>
          <MyApp />
          <ThemePanel />
        </Theme>
      </body>
    </html>
  )
}
```

4. Add theme switching with `next-theme`

```sh
npm i next-theme
```

```tsx
// providers.tsx
<ThemeProvider attribute="class">{children}</ThemeProvider>
```

```tsx
// ThemeSwitch.tsx
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
```
