import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos } from "./todoActions";
import { Todo, TodoState } from "./todoTypes";

const initialState: TodoState = {
  isLoading: false
}

const todoSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTodos.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.isLoading = false
        state.todos = action.payload
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
  }
})

export const { setTodos } = todoSlice.actions

export default todoSlice