import { Todo } from "../todoType"

export type TodoGetAll = Todo

export interface TodosGetAllState {
  isLoading: boolean
  todos?: TodoGetAll[]
  error?: { message: string }
}

export type TodosGetAllResponseBody = TodoGetAll[]
