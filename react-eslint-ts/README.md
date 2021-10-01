# React eslint ts

Example of using eslint in a React app.

## Technologies

- create-react-app
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-config-airbnb
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-react
- eslint-plugin-react-hooks

## Setup

- Initialize with create-react-app:

```bash
$ npx create-react-app react-eslint-ts --template typescript
```

- Initialize eslint:

```bash
# Make sure you have eslint installed globaly
$ eslint --init
```

> NOTE: create-react-app includes eslint so you can add a script `"lint": "eslint --init"` and call it with `$ npm run lint`

- Run ESlint extension

- Create lint script `"lint": "eslint ./src --ext .ts,.tsx"` and run:

```bash
$ npm run lint
```

> NOTE: In regards to importing React, read the [official documentation](https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/eslint-plugin/docs/rules/no-use-before-define.md#how-to-use).
