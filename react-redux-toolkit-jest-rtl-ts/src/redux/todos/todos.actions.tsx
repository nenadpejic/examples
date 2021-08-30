import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTodosService } from "services/todos";
import { Todo } from "./todos.types";

export const getAllTodos = createAsyncThunk<
  Todo[],
  void,
  {}
>(
  'todos/getAllTodos',
  async () => {
    const todos = await getAllTodosService()
    return todos
  }
)
