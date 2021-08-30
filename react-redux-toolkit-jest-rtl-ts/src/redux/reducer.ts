import { combineReducers } from "@reduxjs/toolkit"
import todosSlice from "./todos/todos.slice"

const reducer = combineReducers({
  todos: todosSlice.reducer
})

export default reducer