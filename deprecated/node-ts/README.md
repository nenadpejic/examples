# Node Typescript

Example of setting up Node to run with Typescript.

## Setup

- To use ES modules (import) run `$ npm init -y` and add `"type": "module"` to the package.json

- To run ts files, install typescript (> 4.7) as a dev dep `$ npm i -D typescript`

- Add script that runs the ts compiler `"build": "tsc"`

- Create entrance file `/src/index.ts`

- Add type declarations by installing types `$ npm i -D @types/node`

- Create `tsconfig.json` to configure the ts compiler

OPTIONAL:

- Install `nodemon` and `concurrently` to run tsc in watch mode and nodemon together

NOTES:

- Relative import paths need explicit file extensions in EcmaScript imports when '--moduleResolution' is 'node16' or 'nodenext'. This is because you can write commonJs files in parallel with modules.
