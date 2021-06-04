import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todos/todosSlice";

const store = configureStore({
  reducer: {
    todos: todosSlice.reducer
  }
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store