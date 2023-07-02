import { axiosJsonplaceholder } from "./axios"
import { AddTodoRequestBody, AddTodoResponseBody, GetAllTodosResponseBody } from "./todos.types"

export const getAllTodos = async () => {
  const { data } = await axiosJsonplaceholder.get<GetAllTodosResponseBody>("/todos")
  return data
}

interface AddTodoInput {
  body: AddTodoRequestBody
}

export const addTodo = async ({ body }: AddTodoInput) => {
  const { data } = await axiosJsonplaceholder.post<AddTodoResponseBody>("/todos", body)
  return data
}
