import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTodo, getTodos, postTodo, putTodo } from "./todosActions";
import { Todo, TodosState } from "./todosTypes";

const initialState: TodosState = {
  isLoading: false,
  todos: undefined,
  error: undefined,
  todo: undefined
}

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    },
    resetTodosState: () => initialState,
  },
  extraReducers: (builder) => {
    // GET
    builder.addCase(getTodos.pending, (state, _) => {
      state.isLoading = true
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = action.payload
      state.error = undefined
    })
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false
      state.todos = undefined
      state.error = action.error // action.payload if custom error
    })
    // POST
    builder.addCase(postTodo.pending, (state, _) => {
      state.isLoading = true
    })
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.todo = action.payload
      state.todos = [...state.todos || [], action.payload]
      state.error = undefined
    })
    builder.addCase(postTodo.rejected, (state, action) => {
      state.isLoading = false
      state.todo = undefined
      state.todos = undefined
      state.error = action.error
    })
    // PUT
    builder.addCase(putTodo.pending, (state, _) => {
      state.isLoading = true
    })
    builder.addCase(putTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.todo = action.payload
      state.todos = [...state.todos || []].map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload
        }
        return todo
      })
      state.error = undefined
    })
    builder.addCase(putTodo.rejected, (state, action) => {
      state.isLoading = false
      state.todo = undefined
      state.todos = undefined
      state.error = action.error
    })
    // DELETE
    builder.addCase(deleteTodo.pending, (state, _) => {
      state.isLoading = true
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.todos = [...state.todos || []].filter(todo => todo.id !== action.payload)
      state.error = undefined
    })
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false
      state.todos = undefined
      state.error = action.error
    })
  }
})

export const { setTodos, resetTodosState } = todosSlice.actions

export default todosSlice