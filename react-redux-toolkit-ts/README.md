# React redux toolkit ts

Example of using Redux via @reduxjs/toolkit as store management in a React app.

## Technologies

- create-react-app
- redux
- react-redux
- redux-thunk
- redux-devtools-extension
- typescript
- axios

## Setup

- Initialize with create-react-app:

```bash
$ npx create-react-app react-redux-toolkit-ts --template typescript
```

- Install dependencies:

```bash
$ npm i @reduxjs/toolkit react-redux axios
```

- Setup store:
  - Create redux/store.ts
  - Use `configureStore()`
  - Wrap app with `<Provider>`

- Setup axios:
  - Create axios.ts
  - Create axiosJP, use `axios.create()`

- Setup todos slice, types, actions:
  - Create redux/todos/todosSlice.ts
  - Use `createSlice()`
  - Create redux/todos/todosTypes.ts
  - Create `TodosState`, `Todo`
  - Use `SerializedError`
  - Create redux/todos/todosActions.ts
  - Use `createAsyncThunk()`

- Setup custom hooks:
  - Create redux/hooks.ts
  - Create `useAppSelector()`, `useAppDispatch()`
  - Export `AppState`, `AppDispatch` from store.ts
  - Use `useSelector()`, `useDispatch()`, `TypedUseSelectorHook`

- Setup Todos component:
  - Create components/Todos/index.tsx
  - Import in App.tsx
  - Use `getTodos`, `postTodo`, `putTodo`, `deleteTodo`, `useAppDispatch`, `useAppSelector`
  - Create components/Todos/Todos.module.css
