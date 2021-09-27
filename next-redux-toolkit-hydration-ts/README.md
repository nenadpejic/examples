# Next redux toolkit hydration ts

Example of using redux via @reduxjs/toolkit and hydrating the store in a Next app.

## Technologies

- create-next-app
- @reduxjs/toolkit
- axios
- typescript
- @types/react

## Setup

- Initialize with create-next-app:

```bash
$ npx create-next-app next-redux-toolit-hydration-ts --ts
```

- Install dependencies:

```bash
$ npm i @reduxjs/toolkit axios
```

- Create `makeStore()` in `src/redux/store.ts`

- Call it in `MyApp.getInitialProps` in `src/pages/_app.tsx` to create a `store`

- Await the dispatch of what is needed to fetch data server side

- Return the created `store` as props

- Pass the `store` to `<Provider />` in `MyApp`
