import { combineReducers } from "redux";
import todosGetAllSlice from "./todos/todosGetAll/todosGetAllSlice";
import todoUpdateSlice from "./todos/todoUpdate/todoUpdateSlice";

const reducer = combineReducers({
  todosGetAll: todosGetAllSlice.reducer,
  todoUpdate: todoUpdateSlice.reducer
})

export default reducer