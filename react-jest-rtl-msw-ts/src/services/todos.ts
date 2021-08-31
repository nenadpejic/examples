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

type PostTodo = Omit<Todo, "id">

export const addTodo = async (todo: PostTodo) => {
  const { data } = await axiosJsonplaceholder.post<Todo>("/todos", todo)
  return data
}
