import { SerializedError } from "@reduxjs/toolkit";

export interface TodosState {
  todos?: Todo[]
  todo?: Todo
  isLoading: boolean
  error?: SerializedError // default toolkit error type
  // error?: {message: string} // custom error type
}

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export type NewTodo = Pick<
  Todo,
  "userId"
  | "title"
  | "completed"
>
