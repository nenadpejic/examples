# React eslint ts

Example of using eslint in a React app.

## Technologies

- create-react-app
- typescript
- @typescript-eslint/eslint-plugin
- @typescript-eslint/parser
- eslint
- eslint-plugin-import
- eslint-plugin-jsx-a11y
- eslint-plugin-react
- eslint-plugin-react-hooks
- prettier

## Setup

- Initialize with create-react-app:

```bash
$ npx create-react-app react-prettier-eslint-ts --template typescript
```

- Initialize editorconfig by creating `.editorconfig` in root directory

- Prettier

  - Initialize prettier by createing `.prettierrc.json` in root directory

  - Add Prettier extension

  - Create prettier script:

  ```json
    "prettier:write": "prettier --write ./src"
  ```

- ESLint

  - Initialize eslint:

  ```bash
  $ eslint --init
  ```

  > NOTE: create-react-app includes eslint so you can add a script `"lint": "eslint --init"` and call it with `$ npm run lint`

  - Add ESLint extension

  - Create lint script:

  ```json
  "lint": "eslint ./src --ext .ts,.tsx"
  ```
