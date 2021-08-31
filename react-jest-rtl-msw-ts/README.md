# react jest rtl msw ts

This is an example of testing a React app with Mock Service Worker.

Technologies:
- create-react-app
- typescript
- axios
- jest
- react-testing-library
- mock-service-worker

# Setup

- Initialize with create-react-app
```bash
$ npx create-react-app react-jest-rtl-msw-ts --template typescript
```

- Install dependencies

```bash
$ npm i axios
$ npm i -D msw
```

- Create `services/axios.ts`

- Create `services/todos.ts`

- Create `mocks/handlers.ts`

- Create `mocks/browser.ts`

- Create `mocks/server.ts`

- Start worker in `index.tsx`

- Setup server in `setupTests.ts`

- Setup msw

```bash
$ npx msw init public/ --save
```
