import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { RejectError, Todo } from "./todoTypes"

export const getTodos = createAsyncThunk<
  Todo[],
  undefined,
  {
    rejectValue: RejectError
  }
>(
  'getTodos',
  async (
    _,
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')
      return data
    } catch (error) {
      return rejectWithValue({
        name: error.response.statusText,
        code: error.response.code,
        message: error.response.data,
      })
    }
  }
)