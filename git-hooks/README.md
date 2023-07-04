# git-hooks

Example project showcasing git-hook usage.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [Husky](https://typicode.github.io/husky/) - Git hook helper
- [commitlint](https://commitlint.js.org/) - Lint commit messages
- [lint-staged](https://github.com/okonet/lint-staged/) - Run linters and formatters against staged git files
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd react
```

- Make sure to use the node version specified in `.nvmrc`. It is recommended to use `nvm` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

```sh
$ nvm use
```

- Intall dependencies. This project uses npm.

```sh
$ npm install
```

## Development

## Build and Test

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

## Guide

Different types of hooks. [Official Git Hooks docs](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

- Client-Side Hooks
  - Committing-Workflow Hooks - `git commit`
    - `pre-commit`
    - `prepare-commit-msg`
    - `commit-msg`
    - `post-commit`
  - Email Workflow Hooks - `git am`
    - `applypatch-msg`
    - `pre-applypatch`
    - `post-applypatch`
  - Other Client Hooks
    - `pre-rebase`
    - `post-rewrite`
    - `post-checkout`
    - `post-merge`
    - `pre-push`
    - `pre-auto-gc`
- Server-Side Hooks
  - `pre-receive` - Runs before receiving a push from client.
  - `update` - Runs once per branch the client is pushing to.
  - `post-receive` - Runs after the entire process is completed.

### NPM

Initialize

```sh
$ npm init
```

### GIT

Initialize

```sh
$ git init
```

Configure

```sh
$ echo -e "# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.\n\n# dependencies\n/node_modules" > .gitignore
```

### Husky

Initialize [Official docs](https://typicode.github.io/husky/getting-started.html)

```sh
# Automatic
$ npx husky-init && npm install

# Manual
$ npm i -D husky
$ npx husky install
$ npm pkg set scripts.prepare="husky install"
```

### Commitlint

Install [Official docs](https://commitlint.js.org/#/guides-local-setup)

```sh
$ npm i -D @commitlint/{cli,config-conventional}
```

Configure

```sh
$ echo '{ "extends": ["@commitlint/config-conventional"] }' > .commitlintrc.json
```

Test

```sh
$ echo 'this message should not pass' | npx commitlint
```

Add hook

```sh
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit ${1}'
```

### lint-staged

Install [Official docs](https://github.com/okonet/lint-staged#installation-and-setup)

```sh
$ npm i -D lint-staged
```

Configure

```sh
$ echo -e '{\n"*.{js,jsx,ts,tsx}": "eslint --cache --fix",\n"**/*": "prettier --write --ignore-unknown"\n}' > .lintstagedrc.json
```

Add hook

```sh
$ npx husky add .husky/pre-commit 'npx lint-staged'
```

### ESLint

Initialize [Official docs](https://eslint.org/docs/latest/use/getting-started)

```sh
$ npm init @eslint/config
$ echo -e '# See https://eslint.org/docs/latest/use/configure/ignore/ for more about ignoring files.\n' > .eslintignore

# Options:
# core:
# eslint@latest

# ts:
# @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest

# style guides:
# eslint-config-airbnb-base@latest
# eslint-config-standard@latest eslint-plugin-import@latest eslint-plugin-n@latest eslint-plugin-promise@latest
# eslint-config-google@latest
# eslint-config-xo@latest

# frameworks:
# eslint-plugin-react@latest
```

### Prettier

Install [Official docs](https://prettier.io/docs/en/install.html)

```sh
$ npm install --save-dev --save-exact prettier
```

Configure

```sh
$ echo -e '{\n"semi": false,\n"singleQuote": true,\n"trailingComma": "all"\n}' > .prettierrc.json
$ echo -e '# See https://prettier.io/docs/en/ignore.html/ for more about ignoring files.\n' > .prettierignore
```

[Integrating with Linters](https://prettier.io/docs/en/integrating-with-linters.html)

```sh
$ npm install --save-dev eslint-config-prettier
```

```json
// .eslintrc.*
{
  "extends": ["some-other-config-you-use", "prettier"]
}
```

### Tests

Add tests and typescript check to pre-push hook

```sh
$ npx husky add .husky/pre-push 'npx tsc && npm test'
```
