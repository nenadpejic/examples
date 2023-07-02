import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosJsonplaceholder } from "services/axios";
import { TodoUpdateRequestBody, TodoUpdateRequestParams, TodoUpdateResponseBody } from "./todoUpdateTypes";

interface Input {
  params: TodoUpdateRequestParams
  body: TodoUpdateRequestBody
}

interface Output {
  data: TodoUpdateResponseBody
}

export const updateTodo = createAsyncThunk<
  Output,
  Input,
  { rejectValue: { message: string } }
>(
  'todos/updateTodo',
  async ({ params, body }, { rejectWithValue }) => {
    const { id } = params
    try {
      const { data } = await axiosJsonplaceholder.put(
        `/todos/${id}`,
        body
      )
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