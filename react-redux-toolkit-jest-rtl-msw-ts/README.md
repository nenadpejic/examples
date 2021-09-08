# react redux toolkit jest rtl msw ts

This is an example of testing a React app with Redux via @reduxjs/toolkit, using Jest with React Testing Library and Mock Service Worker and a custom render function.

Technologies:
- create-react-app
- typescript
- axios
- redux via @reduxjs/toolkit, react-redux
- jest
- react-testing-library
- mock-service-worker

# Setup

- Initialize
```
$ npx create-react-app react-redux-toolkit-jest-rtl-msw-ts --template typescript
```

- Install dependencies
```
$ npm i axios @reduxjs/toolkit react-redux
$ npm i -D msw
```

- Setup axios
  - Create axios instance

- Setup redux
  - Create store 
  - Create reducer 
  - Create hooks 
  - Create slice 
  - Create types 
  - Create actions 
  - Introduce store in index.tsx

- Setup msw
  - Create handlers
  - Create server
  - Create browser
  - Introduce server in setupTests.ts
  - Introduce msw via script
  ```bash
  $ npx msw init public/ --save
  ```

- Setup test
  - Create App.test.tsx
