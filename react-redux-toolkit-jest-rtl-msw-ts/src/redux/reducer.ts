import { combineReducers } from "redux";
import todosGetAllSlice from "./todos/todosGetAll/todosGetAllSlice";

const reducer = combineReducers({
  todosGetAll: todosGetAllSlice.reducer
})

export default reducer