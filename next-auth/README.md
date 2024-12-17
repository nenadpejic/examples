# next-auth

Example project showcasing [Next Auth](https://next-auth.js.org/) for handling authentication with Next.js.

This project was bootstrapped with [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app), by running `$ npx create-next-app`.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [ESLint](https://eslint.org/) - Linter
- [Next](https://nextjs.org/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Static types
- [Next Auth](https://next-auth.js.org/) - Authentication

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd next-auth
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

1. Add the `next-auth` package as dependency.
2. Create a `handle` function in `src/pages/api/auth/[...nextauth].ts` or `src/app/api/auth/[...nextauth]/route.ts` if using the app directory.
3. Link to `api/auth/signin` and `api/auth/signout` in the header.
4. Create `src/middleware.ts`
5. Add a `NEXTAUTH_SECRET=` with `$ openssl rand -base64 32`
