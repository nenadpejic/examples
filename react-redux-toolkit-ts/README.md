# React redux toolkit ts

React app, using redux, created using toolkit, in typescript.

## Instructions

1. Create React app

```bash
$ npx create-react-app . --template typescript
```

2. Install dependencies

```bash
$ npm i @reduxjs/toolkit react-redux axios
```

3. Setup store.ts

- Create redux/store.ts
- Use `configureStore()`
- Wrap app with `<Provider>`

4. Optional: Setup axios

- Create axios.ts
- Create axiosJP, use `axios.create()`

5. Setup todos slice, types, actions

- Create redux/todos/todosSlice.ts
- Use `createSlice()`
- Create redux/todos/todosTypes.ts
- Create `TodosState`, `Todo`
- Use `SerializedError`
- Create redux/todos/todosActions.ts
- Use `createAsyncThunk()`

6. Setup custom hooks

- Create redux/hooks.ts
- Create `useAppSelector()`, `useAppDispatch()`
- Export `AppState`, `AppDispatch` from store.ts
- Use `useSelector()`, `useDispatch()`, `TypedUseSelectorHook`

7. Setup Todos component

- Create components/Todos/index.tsx
- Import in App.tsx
- Use `getTodos`, `postTodo`, `putTodo`, `deleteTodo`, `useAppDispatch`, `useAppSelector`
- Create components/Todos/Todos.module.css
