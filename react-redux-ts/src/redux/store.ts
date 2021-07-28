import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import reducer from "./reducer"

const preloadedState = {}

const middlewares = [thunk]
const middlewareEnhancer = applyMiddleware(...middlewares)

const enhancers = [middlewareEnhancer]
const composedEnhancers = composeWithDevTools(...enhancers)

const store = createStore(
  reducer,
  preloadedState,
  composedEnhancers
)

// @ts-ignore
if (process.env.NODE_ENV !== 'production' && module.hot) {
  // @ts-ignore
  module.hot.accept('./reducer', () => store.replaceReducer(reducer))
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store
