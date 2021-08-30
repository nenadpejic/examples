import { createSlice } from "@reduxjs/toolkit";
import { getAllTodos } from "./todos.actions";
import { TodosState } from "./todos.types";

const todosState: TodosState = {
  isLoading: false,
  todos: undefined,
  error: undefined
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getAllTodos.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
    })
    builder.addCase(getAllTodos.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  }
})

export default todosSlice
