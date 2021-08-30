import { SerializedError } from "@reduxjs/toolkit";

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodosState {
  isLoading: boolean
  todos?: Todo[]
  error?: SerializedError
}
