# React jest rtl msw ts

Example of testing a React app with Jest, React Testing Library and Mock Service Worker.

## Technologies

- create-react-app
- typescript
- axios
- jest
- react-testing-library
- mock-service-worker

## Setup

- Initialize with create-react-app:

```bash
$ npx create-react-app react-jest-rtl-msw-ts --template typescript
```

- Install dependencies:

```bash
$ npm i axios
$ npm i -D msw
```

- Create `services/axios.ts`

- Create `services/todos.ts`

- Create `mocks/handlers.ts`

- Create `mocks/browser.ts`

- Create `mocks/server.ts`

- Implement browser worker in `index.tsx`

- Setup server worker in `setupTests.ts`

- Setup msw with command:

```bash
$ npx msw init public/ --save
```

## Testing

Run tests:

```bash
$ npm test
```
