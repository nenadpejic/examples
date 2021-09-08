import { createSlice } from "@reduxjs/toolkit";
import { getAllTodos } from "./todosGetAllActions";
import { TodosGetAllState } from "./todosGetAllTypes";

const initialState: TodosGetAllState = {
  isLoading: false,
  todos: undefined,
  error: undefined
}

const todosGetAllSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllTodos.pending, (state, _) => {
      state.isLoading = true
    })
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
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