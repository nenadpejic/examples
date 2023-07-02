# Bootstrap

Example of using Bootstrap.

## Technologies

- bootstrap
- sass
- nodemon
- serve
- npm-run-all

## Setup

- Initalize npm:

```bash
$ npm init
```

- Install dependencies:

```bash
$ npm i bootstrap
$ npm i -D sass nodemon npm-run-all serve
```

- Create a custom.scss file. This where you write all the default style overides.

- Run dev server:

```bash
$ npm run start
```

- NOTES:
  - `sass` is used to compile .scss files from scss/ into .css files and put them in assets/css.
  - `nodemon` is used to watch for .html and .scss file changes and run the sass compiler on change.
  - `serve` is used to run the local development server. NOTE: Doesn't suppoer live reload.
  - `npm-run-all` is used to run nodemon and serve in parallel.
