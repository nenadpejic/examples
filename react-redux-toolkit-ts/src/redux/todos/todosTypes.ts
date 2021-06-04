import { SerializedError } from "@reduxjs/toolkit";

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export interface NewTodo {
  userId: number
  title: string
  completed: boolean
}

export interface TodosState {
  todos: Todo[]
  todo?: Todo
  isLoading: boolean
  isSuccess: boolean
  error?: SerializedError
}
