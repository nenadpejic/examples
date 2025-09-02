# react-vitest-rtl-msw

Example project showcasing [React](https://react.dev/) for building front-end apps.

This project was bootstrapped with [Create Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite).

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [PNPM](https://pnpm.io/) - Package manager
- [Biome](https://biomejs.dev/) - Formatter and Linter
- [Typescript](https://www.typescriptlang.org/) - Static types
- [Vite](https://vitejs.dev/) - Bundler
- [React](https://react.dev/) - Framework
- [Vitest](https://vitest.dev/) - Test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) - Testing utility
- [Mock Service Worker](https://mswjs.io/) - Mock network requests

## Installation

Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd ./react-vitest-rtl-msw
```

Make sure to use the node version specified in `.nvmrc`. It is recommended to use `nvm` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

```sh
$ nvm use
```

Intall dependencies. This project uses `pnpm`. [Official pnpm docs](https://pnpm.io/)

```sh
$ corepack enable
$ pnpm install
```

## Development

Run local dev server

```sh
$ pnpm run dev
```

## Build and Test

Bundle for production

```sh
$ pnpm run build
```

## Contributing

1. Create a new feature branch

```sh
$ git checkout -b feat/<feature-name>
```

2. Commit messages need to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

```sh
$ git add .
$ git commit -m '<type>[optional scope]: <description>'
```

3. Open a pull request and once approved merge by squashing commits

Optional: Rebase beforehand

```sh
$ git rebase master HEAD~<number-of-commits> -i
```

## Deployment

## Guide

1. Vitest

```sh
vitest # core package
jsdom # environment
@vitest/coverage-v8 # code coverage
```

2. React Testing Library

```sh
@testing-library/react
@testing-library/jest-dom
```

3. Mock Service Worker

```sh
msw
```