# react-hook-form-zod

Example project showcasing [React Hook Form](https://react-hook-form.com/) and [Zod](https://zod.dev/) for handling form state and validation.

This project was bootstrapped with [Create Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite), by running `$ yarn create vite@latest react --template react-swc-ts`.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter
- [Vite](https://vitejs.dev/) - Bundler
- [React](https://react.dev/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Static types
- [React Hook Form](https://react-hook-form.com/) - Form handler
- [Zod](https://zod.dev/) - Form validation

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd react-hook-form-zod
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

## Guide

Install dependencies:

```sh
$ npm install react-hook-form @hookform/resolvers
$ npm install zod
$ npm install @headlessui/react
```
