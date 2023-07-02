# Commitlint, Husky

Example of using commitlint and husky npm packages. Commitlint is used to validate a message against the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) specifications. Husky is used to run commitlint on commits before they are created.

Commitlint synopsis:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

type
fix:, feat:, build:, chore:, ci:, docs:, style:, refactor:, perf:, test:
```

Commitlint:
[Package](https://www.npmjs.com/package/@commitlint/cli)
|
[Repo](https://github.com/conventional-changelog/commitlint)
|
[Homepage](https://commitlint.js.org/#/)

Husky:
[Package](https://www.npmjs.com/package/husky)
|
[Repo](https://github.com/typicode/husky)
|
[Homepage](https://typicode.github.io/husky/#/)

## Technologies

- commitlint
- husky

## Installation

Initialize Commitlint:

```bash
# Install
$ npm i -D @commitlint/cli @commitlint/config-conventional

# Create config file
$ echo '{ "extends": ["@commitlint/config-conventional"] }' > .commitlintrc.json
```

Test Commitlint:

```bash
$ echo 'this message should not pass' | npx commitlint
```

Initialize Husky:

```bash
# Install
$ npm i -D husky

# Add script
$ npm set-script prepare "husky install"

# Run script to activate hooks
# NOTE: Working dir needs to be a git repo
$ npm run prepare

# Add commit-msg hook
$ npx husky add .husky/commit-msg 'npx --no -- commitlint --edit $1'
```
