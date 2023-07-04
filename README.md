# Examples

A collection of example projects showcasing the use of different technologies.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [Husky](https://typicode.github.io/husky/) - Git hook helper
- [commitlint](https://commitlint.js.org/) - Lint commit messages

## Development

When creating a new example project, run the create script to initialize a README.md template.

```sh
$ npm run create <project-name>
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
