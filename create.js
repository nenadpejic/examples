import { join } from "node:path";
import fs from "node:fs";

const targetDir = process.argv[2];

if (!targetDir) throw new Error("You need to speciffy the target directory");

const readmeContent = `# ${targetDir}
  
Example app showcasing [React](https://react.dev/) for building front-end apps.

This project was bootstrapped with [Create Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite), by running \`$ yarn create vite@latest react --template react-swc-ts\`.

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [Yarn](https://yarnpkg.com/) - Package manager
- [Vite](https://vitejs.dev/) - Bundler
- [React](https://react.dev/) - Framework
- [Typescript](https://www.typescriptlang.org/) - Static types
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter

## Installation

- Clone repo and cd into project

\`\`\`sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd react
\`\`\`

- Make sure to use the node version specified in \`.nvmrc\`. It is recommended to use \`nvm\` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

\`\`\`sh
$ nvm use
\`\`\`

- Intall dependencies. This project uses yarn so make sure to use the version specified in \`package.json\` under \`packageManager\`. It is recomended to use corepack. [Official yarn docs](https://yarnpkg.com/getting-started/install)

\`\`\`sh
$ corepack enable
$ yarn install
\`\`\`

## Development

- Run local dev server

\`\`\`sh
$ yarn dev
\`\`\`

## Build and Test

- Bundle for production

\`\`\`sh
$ yarn run build
\`\`\`

## Contributing

- Create a new feature branch

\`\`\`sh
$ git checkout -b feat/<feature-name>
\`\`\`

- Commit messages need to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

\`\`\`sh
$ git add .
$ git commit -m '<type>[optional scope]: <description>'
\`\`\`

- Open a pull request and merge once approved.

## Guide

`;

const absolutePathToReadme = join(process.cwd(), targetDir, "README.md");

const writeReadme = () => {
  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    fs.writeFileSync(absolutePathToReadme, readmeContent);
    console.log("✔️ Readme template created");
  } catch (err) {
    console.error(err);
  }
};

writeReadme();
