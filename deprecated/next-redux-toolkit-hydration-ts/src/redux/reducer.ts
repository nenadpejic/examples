import { combineReducers } from "@reduxjs/toolkit"
import todoSlice from "./todo/todoSlice"

const reducer = combineReducers({
  todo: todoSlice.reducer
})

export default reducer
