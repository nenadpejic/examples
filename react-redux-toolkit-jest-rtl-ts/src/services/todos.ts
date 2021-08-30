import { axiosJsonplaceholder } from "./axios"

export const getAllTodosService = async () => {
  const { data } = await axiosJsonplaceholder.get("/todos")
  return data
}