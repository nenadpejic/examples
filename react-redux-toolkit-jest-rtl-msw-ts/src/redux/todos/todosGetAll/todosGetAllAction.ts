import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosJsonplaceholder } from "services/axios";
import { TodosGetAllResponseBody } from "./todosGetAllTypes";

interface Output {
  data: TodosGetAllResponseBody
}

export const getAllTodos = createAsyncThunk<
  Output,
  void,
  { rejectValue: { message: string } }
>(
  'todos/getAllTodos',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosJsonplaceholder.get('/todos')
      return { data }
    } catch (error: any) {
      let message = 'Unhandled error'
      if (error.response.data.message) {
        message = error.response.data.message
      } else if (error.message) {
        message = error.message
      }
      return rejectWithValue({ message })
    }
  }
)
