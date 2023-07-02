import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { TodosGetAllAction } from "./todosTypes";

export const getAllTodos = (): ThunkAction<
  void, // TReturnType
  RootState, // TState
  unknown, // TExtraThunkArg
  TodosGetAllAction // TBasicAction
> => async (
  dispatch,
  getState
) => {
    try {
      dispatch({ type: "todosGetAll/pending" })

      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')

      dispatch({ type: "todosGetAll/fulfilled", payload: data })

    } catch (error: any) {
      let message = 'Unhandled error'

      if (error.response.data.message) {
        message = error.response.data.message
      } else if (error.message) {
        message = error.message
      }

      dispatch({ type: "todosGetAll/rejected", error: { message } })
    }
  }

// Using fetch
export const getAllTodosUsingFetch = (): ThunkAction<
  void, // TReturnType
  RootState, // TState
  unknown, // TExtraThunkArg
  TodosGetAllAction // TBasicAction
> => async (
  dispatch,
  getState
) => {
    dispatch({ type: "todosGetAll/pending" })

    const response = await fetch('https://jsonplaceholder.typicode.com/todos')

    if (response.ok) {

      const data = await response.json()
      dispatch({ type: "todosGetAll/fulfilled", payload: data })

    } else {

      const message = "Failed to fetch data!"
      dispatch({ type: "todosGetAll/rejected", error: { message } })
    }
  }

// Synchronous example
export const resetTodosGetAllState = (): TodosGetAllAction => {
  return {
    type: "todosGetAllReset"
  }
}
