# next-stytch-playwright

Example using Next, Stytch and Playwright.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [Next](https://nextjs.org/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Static types
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter
- [Tailwindcss](https://tailwindcss.com/) - Styling
- [Stytch](https://stytch.com/) - Authentication
- [Playwright](https://playwright.dev/) - Testing

## Installation

Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/next-stytch-playwright.git
$ cd next-stytch-playwright
```

Make sure to use the node version specified in `.nvmrc`. It is recommended to use `nvm` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

```sh
$ nvm use
```

Intall dependencies. This project uses npm.

```sh
$ npm install
```

## Development

Run local dev server

```sh
$ npm run dev
```

Or run both json and local dev server concurrently

```sh
$ npm start
```

## Build and Test

Bundle for production

```sh
$ npm run build
```

## Contributing

Create a new feature branch

```sh
$ git checkout -b feat/<feature-name>
```

Commit messages need to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

```sh
$ git add .
$ git commit -m '<type>[optional scope]: <description>'
```

Open a pull request and once approved merge by squashing commits

Optional: Rebase beforehand

```sh
$ git rebase master HEAD~<number-of-commits> -i
```

## Guide

Stytch https://stytch.com/docs/quickstarts/nextjs
