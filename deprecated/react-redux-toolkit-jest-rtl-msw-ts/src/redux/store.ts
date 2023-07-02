import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

export const makeStore = () => configureStore({
  reducer
})

const store = makeStore()

export type StoreDispatch = typeof store.dispatch
export type StoreState = ReturnType<typeof store.getState>

export default store