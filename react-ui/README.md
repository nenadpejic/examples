# React UI

Example of basic vanilla React ui elements with Tailwindcss for styling.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter
- [Vite](https://vitejs.dev/) - Bundler
- [React](https://react.dev/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Static types
- [Tailwindcss](https://tailwindcss.com/) - Styling

Plugins:

- [Vite Plugin SVGR](vite-plugin-svgr) - Import SVGs
- [Tailwind Merge](tailwind-merge) - Allow merging of classes
- [Eslint Prettier](eslint-config-prettier) - Eslint extend for `plugin:react/recommended` and `plugin:react/jsx-runtime`
- [Eslint React](eslint-plugin-react) - Eslint extend for `prettier`

## Installation

- Clone repo and cd into project

```sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd examples/react-ui
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
