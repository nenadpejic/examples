import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";

const store = configureStore({
  reducer,
  // NOTE: leaving middleware as an empty array will break useAppDispatch()
  // middleware: [...getDefaultMiddleware()],
  // preloadedState: {},
  // enhancers: []
})

// @ts-ignore
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // @ts-ignore
  module.hot.accept('./reducer', () => store.replaceReducer(reducer))
}

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store