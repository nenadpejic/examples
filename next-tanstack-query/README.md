# next-tanstack-query

Example project showcasing [Tanstack Query](https://tanstack.com/query/latest) for building front-end apps.

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [PNPM](https://pnpm.io/) - Package manager
- [Typescript](https://www.typescriptlang.org/) - Static types
- [Next](https://nextjs.org/) - Framework
- [Tailwindcss](https://tailwindcss.com/) - Styling
- [Tanstack Query](https://tanstack.com/query/latest) - Async state management

## Installation

Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd ./next-tanstack-query
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

Add package

```sh
$ pnpm add @tanstack/react-query
```
