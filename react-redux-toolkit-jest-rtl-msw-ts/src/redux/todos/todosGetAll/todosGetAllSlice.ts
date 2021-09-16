import { createSlice } from "@reduxjs/toolkit";
import { getAllTodos } from "./todosGetAllAction";
import { TodosGetAllState } from "./todosGetAllTypes";

const initialState: TodosGetAllState = {
  isLoading: false,
  todos: undefined,
  error: undefined
}

const todosGetAllSlice = createSlice({
  name: 'todosGetAll',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllTodos.pending, (state, _) => {
      state.isLoading = true
    })
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload.data
      state.error = undefined
    })
    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.isLoading = false
      state.todos = undefined
      state.error = action.payload
    })
  }
})

export default todosGetAllSlice