# next redux toolkit hydration ts

Example next app, with redux via toolkit, store hydration from server side, in typescript.

# Initialization

```
$ npx create-next-app next-redux-toolit-hydration-ts --ts
```

# Setup

- Add dependencies

```
$ npm i @reduxjs/toolkit axios
```

- Create `makeStore()` in `src/redux/store.ts`
- Call it in `MyApp.getInitialProps` in `src/pages/_app.tsx` to create a `store`
- Await the dispatch of what is needed to fetch data server side
- Return the created `store` as props
- Pass the `store` to `<Provider />` in `MyApp`
