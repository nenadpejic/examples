import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosJsonplaceholder } from "services/axios";
import { NewTodo, Todo } from "./todosTypes";

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    const { data } = await axiosJsonplaceholder.get<Todo[]>('/todos')
    return data
  }
)

// With custom error message
export const getTodosWithCustomError = createAsyncThunk<
  Todo[], // returned
  void, // argument
  { rejectValue: { message: string } } // config
>(
  'todos/getTodosWithCustomError',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosJsonplaceholder.get<Todo[]>('/todos')
      return data
    } catch (error: any) {
      let message = 'Unhandled error'
      if (error.response.data.message) {
        message = error.response.data.message
      } else {
        message = error.response.message
      }
      return rejectWithValue({ message }) // access in reducer .rejected with action.payload
    }
  }
)

export const postTodo = createAsyncThunk(
  'todos/postTodo',
  async (newTodo: NewTodo) => {
    const { data } = await axiosJsonplaceholder.post<Todo>('/todos', newTodo)
    return data
  }
)

export const putTodo = createAsyncThunk(
  'todos/putTodo',
  async (todo: Todo) => {
    const { data } = await axiosJsonplaceholder.put<Todo>(`/todos/${todo.id}`, todo)
    return data
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await axiosJsonplaceholder.delete(`/todos/${id}`)
    return id
  }
)
