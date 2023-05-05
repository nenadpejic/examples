# React jest rtl msw ts

Example of testing a React app with Jest, React Testing Library and Mock Service Worker.

## Technologies

- create-react-app
- typescript
- axios
- jest
- react-testing-library
- mock-service-worker

## Dependencies

- `jest` - Run script `jest --watch`.
- `@types/jest` - Provides type definitions for `describe`, `beforeEach` etc.
- `jest-environment-jsdom` - To be able to run in `jsdom` environment.
- `@testing-library/react` - Exports methods `render`, `screen`.
- `@testing-library/user-event` - Exports `userEvent`.
- `ts-jest` - Enables parsing of jsx syntax. Add this to jest.config `transform: {"^.+\\.(ts|tsx|js|jsx)$": "ts-jest"}`
- `jest-svg-transformer` - Enables parsing of svg. Add this to jest.config `transform: {'^.+\\.svg$': 'jest-svg-transformer'}`
- `@testing-library/jest-dom` - Adds assertions like `toBeInTheDocument()`. Need to import `import "@testing-library/jest-dom/extend-expect";` to specific test file, or write it in `jest.setup.js` and configure `jest.config.js` to have `setupFilesAfterEnv: ["<rootDir>/jest.setup.js"]`.

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
