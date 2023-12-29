import { join } from "node:path";
import fs from "node:fs";

const targetDir = process.argv[2];

if (!targetDir) throw new Error("You need to speciffy the target directory");

const readmeContent = `# ${targetDir}
  
Example project showcasing [React](https://react.dev/) for building front-end apps.

<!-- Vite or Next -->
<!-- This project was bootstrapped with [Create Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite), by running \`$ yarn create vite@latest react --template react-swc-ts\`. -->

<!-- This project was bootstrapped with [Create Next App](https://nextjs.org/docs/pages/api-reference/create-next-app), by running \`$ npx create-next-app\`. -->

## Technologies

- [Git](https://git-scm.com/) - Version control system
- [Node](https://nodejs.org/en) - Runtime
- [NPM](https://www.npmjs.com/) - Package manager
- [Yarn](https://yarnpkg.com/) - Package manager
- [Husky](https://typicode.github.io/husky/) - Git hook helper
- [commitlint](https://commitlint.js.org/) - Lint commit messages
- [lint-staged](https://github.com/okonet/lint-staged/) - Run linters and formatters against staged git files
- [ESLint](https://eslint.org/) - Linter
- [Prettier](https://prettier.io/) - Formatter
- [Typescript](https://www.typescriptlang.org/) - Static types
- [Vite](https://vitejs.dev/) - Bundler
- [React](https://react.dev/) - Framework
- [Next](https://nextjs.org/) - Framework
- [React Router Dom](https://reactrouter.com/) - Routing
- [Tailwindcss](https://tailwindcss.com/) - Styling
- [RadixUI](https://www.radix-ui.com/) - UI
- [ShadcnUI](https://ui.shadcn.com/) - UI
- [Next Themes](https://github.com/pacocoursey/next-themes) - Theme switching

## Installation

- Clone repo and cd into project

\`\`\`sh
$ git clone git@github.com:nenadpejic/examples.git
$ cd ${targetDir}
\`\`\`

- Make sure to use the node version specified in \`.nvmrc\`. It is recommended to use \`nvm\` for node version management. [Official nvm docs](https://github.com/nvm-sh/nvm/blob/master/README.md)

\`\`\`sh
$ nvm use
\`\`\`

<!-- Yarn or NPM -->
<!-- - Intall dependencies. This project uses \`yarn\` so make sure to use the version specified in \`package.json\` under \`packageManager\`. It is recomended to use \`corepack\`. [Official yarn docs](https://yarnpkg.com/getting-started/install) -->

<!-- - Intall dependencies. This project uses \`npm\`. [Official npm docs](https://www.npmjs.com/) -->

\`\`\`sh
$ corepack enable
$ yarn install
# or
$ npm install
\`\`\`

## Development

- Run local dev server

\`\`\`sh
$ yarn dev
# or
$ npm run dev
\`\`\`

## Build and Test

- Bundle for production

\`\`\`sh
$ yarn run build
# or
$ npm run build
\`\`\`

## Contributing

- Create a new feature branch

\`\`\`sh
$ git checkout -b feat/<feature-name>
\`\`\`

- Commit messages need to follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/)

\`\`\`sh
$ git add .
$ git commit -m '<type>[optional scope]: <description>'
\`\`\`

- Open a pull request and once approved merge by squashing commits

- Optional: Rebase beforehand

\`\`\`sh
$ git rebase master HEAD~<number-of-commits> -i
\`\`\`

## Deployment

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
