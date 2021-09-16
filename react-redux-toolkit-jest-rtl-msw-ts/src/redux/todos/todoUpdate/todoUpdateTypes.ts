import { Todo } from "../todoType"

export type TodoUpdate = Todo

export interface TodoUpdateState {
  isLoading: boolean
  todo?: TodoUpdate
  error?: { message: string }
}

export interface TodoUpdateRequestParams {
  id: number
}

export type TodoUpdateRequestBody = Omit<Todo, "id">

export type TodoUpdateResponseBody = Todo
