import { createSlice } from "@reduxjs/toolkit";
import { updateTodo } from "./todoUpdateAction";
import { TodoUpdateState } from "./todoUpdateTypes";

const initialState: TodoUpdateState = {
  isLoading: false,
  todo: undefined,
  error: undefined
}

const todoUpdateSlice = createSlice({
  name: "todoUpdate",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.todo = action.payload.data
      state.error = undefined
    })
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoading = false
      state.todo = undefined
      state.error = action.payload
    })
  }
})

export default todoUpdateSlice