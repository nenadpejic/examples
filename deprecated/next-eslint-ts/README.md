# Next eslint ts

Example of using eslint in a Next app.

> NOTE: Since version 11.0.0, Next.js provides an integrated ESLint experience out of the box.

## Technologies

- create-next-app
- eslint
- typescript

## Setup

```bash
$ npx create-next-app next-eslint-ts --ts
```

### Since v11.0.0

- Add `next lint` as a script to `package.json`.

```
"scripts" {
  "lint": "next lint"
}
```

- Run it to configure.

```
$ npm run lint
```

- This creates a `.eslintrc.json` file, and adds `eslint, eslint-config-next` as devDependencies.

### Pre v11.0.0

- Add devDependencies

```bash
$ npm i -D @typescript-eslint/eslint-plugin @typescript-eslint/parser babel-eslint eslint eslint-config-react-app eslint-plugin-flowtype eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react eslint-plugin-react-hooks
```

- Create a `.eslintrc.json` file, and set

```
{
  "extends": [
    "react-app"
  ],
  "plugins": [],
  "rules": {}
}
```

#### Added devDependencies

- ESLint
  - @typescript-eslint/eslint-plugin
  - @typescript-eslint/parser
  - babel-eslint
  - eslint
  - eslint-config-react-app
  - eslint-plugin-flowtype
  - eslint-plugin-import
  - eslint-plugin-jsx-a11y
  - eslint-plugin-react
  - eslint-plugin-react-hooks
