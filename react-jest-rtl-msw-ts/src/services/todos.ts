import { axiosJsonplaceholder } from "./axios"

export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export const getAllTodos = async () => {
  const { data } = await axiosJsonplaceholder.get<Todo[]>("/todos")
  return data
}
