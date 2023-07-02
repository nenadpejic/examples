# Git Hooks

Example of using git hook pre-commit.

## Technologies

- prettier
- eslint
- husky
- lint-staged

## Setup

- Initialize npm

```bash
$ npm init
```

- Initialize git

```bash
$ git init
echo > .gitignore
```

- Initialize eslint

```bash
$ npx eslint --init
```

- Initialize prettier

```bash
$ npm i -D prettier
$ echo {} > .prettierrc.json
$ echo > .prettierignore
```

- Overwrite eslint so it doesn't conflict with prettier

  - Install devDependency

  ```bash
  $ npm i -D eslint-config-prettier
  ```

  - Add prettier to `.eslintrc.json`

  ```json
  {
    "extends": ["...", "prettier"]
  }
  ```

- Initialize husky:

```bash
$ npm i -D husky

# Create .husky/_/husky.sh
$ npx husky install

# Create .husky/pre-commit hook and add "npx lint-staged" to be run
$ npx husky add .husky/pre-commit "npx lint-staged"

# Make sure husky is installed after npm install is run, since .husky/_ contents are ignored
$ npm set-script prepare "husky install"
```

- Initialize lint-staged:

  - Install dependency

  ```bash
  $ npm i -D lint-staged
  ```

  - Create `.lintstagedrc.json` and add:

  ```json
  {
    "*.{js,jsx,ts,tsx,md,html,css}": ["prettier --write", "eslint --ext"]
  }
  ```
