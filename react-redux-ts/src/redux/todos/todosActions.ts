import axios from "axios";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../store";
import { TodosGetAllAction } from "./todosTypes";

export const getAllTodos = (): ThunkAction<
  void, // TReturnType
  RootState, // TState
  unknown, // TExtraThunkARg
  TodosGetAllAction // TBasicAction
> => async (
  dispatch,
  getState
) => {
    try {
      dispatch({ type: "todosGetAll/pending" })

      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos')

      dispatch({ type: "todosGetAll/fulfilled", payload: data })

    } catch (error) {

      let message = ''
      if (error.response.data) {
        message = `${error.response.statusText}, ${error.response.status}`
      } else {
        message = error.response.data
      }

      dispatch({ type: "todosGetAll/rejected", error: { message } })
    }
  }
