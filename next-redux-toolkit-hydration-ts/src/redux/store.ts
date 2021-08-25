import { configureStore, PreloadedState } from "@reduxjs/toolkit"
import reducer from "./reducer"
import { TodoState } from "./todo/todoTypes"

export const makeStore = (preloadedState?: PreloadedState<{ todo: TodoState }>) => {
  return configureStore({
    reducer,
    preloadedState
  })
}

// const store = makeStore()
// export default store

// export type AppState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch

export type AppState = ReturnType<typeof reducer>
