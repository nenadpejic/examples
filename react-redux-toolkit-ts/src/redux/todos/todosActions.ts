import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosJP } from "../../axios";
import { NewTodo, Todo } from "./todosTypes";

export const getTodos = createAsyncThunk(
  'todos/getTodos',
  async () => {
    const response = await axiosJP.get<Todo[]>('/todos')
    return response.data
  }
)

export const postTodo = createAsyncThunk(
  'todos/postTodo',
  async (newTodo: NewTodo) => {
    const response = await axiosJP.post<Todo>('/todos', newTodo)
    return response.data
  }
)

export const putTodo = createAsyncThunk(
  'todos/putTodo',
  async (todo: Todo) => {
    const response = await axiosJP.put<Todo>(`/todos/${todo.id}`, todo)
    return response.data
  }
)

export const deleteTodo = createAsyncThunk(
  'todos/deleteTodo',
  async (id: number) => {
    await axiosJP.delete(`/todos/${id}`)
    return id
  }
)
