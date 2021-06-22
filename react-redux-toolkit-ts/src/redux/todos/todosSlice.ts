import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteTodo, getTodos, postTodo, putTodo } from "./todosActions";
import { Todo, TodosState } from "./todosTypes";

const todosState: TodosState = {
  isLoading: false,
  isSuccess: false,
  todos: [],
  error: undefined,
  todo: undefined
}

const todosSlice = createSlice({
  name: 'todos',
  initialState: todosState,
  reducers: {
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload
    }
  },
  extraReducers: (builder) => {
    // GET
    builder.addCase(getTodos.pending, (state, _) => {
      state.isLoading = true
      state.isSuccess = false
      state.error = undefined
    })
    builder.addCase(getTodos.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.todos = action.payload
    })
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
      // state.error = action.payload // custom error
    })
    // POST
    builder.addCase(postTodo.pending, (state, _) => {
      state.isLoading = true
      state.isSuccess = false
      state.error = undefined
    })
    builder.addCase(postTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.todo = action.payload
      state.todos = [...state.todos, action.payload]
    })
    builder.addCase(postTodo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // PUT
    builder.addCase(putTodo.pending, (state, _) => {
      state.isLoading = true
      state.isSuccess = false
      state.error = undefined
    })
    builder.addCase(putTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.todo = action.payload
      state.todos = [...state.todos].map(todo => {
        if (todo.id === action.payload.id) {
          return action.payload
        }
        return todo
      })
    })
    builder.addCase(putTodo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
    // DELETE
    builder.addCase(deleteTodo.pending, (state, _) => {
      state.isLoading = true
      state.isSuccess = false
      state.error = undefined
    })
    builder.addCase(deleteTodo.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.todos = [...state.todos].filter(todo => todo.id !== action.payload)
    })
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error
    })
  }
})

export default todosSlice