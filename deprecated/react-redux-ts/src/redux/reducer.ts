import { combineReducers } from "redux"
import { todosGetAllReducer } from "./todos/todosReducers"

const reducer = combineReducers({
  todosGetAll: todosGetAllReducer
})

export default reducer
