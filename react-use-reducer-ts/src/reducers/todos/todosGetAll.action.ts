import { Dispatch } from "react";
import { TodosGetAllAction, TodosGetAllState } from "./todosGetAll.types";

// NOTE: Not used
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const getAllTodos =
  () =>
  async (dispatch: Dispatch<TodosGetAllAction>, getState: TodosGetAllState) => {
    try {
      dispatch({ type: "pending" });

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos",
        {
          method: "GET",
          headers: myHeaders,
          redirect: "follow",
        }
      );
      const data = await response.json();

      dispatch({ type: "fulfilled", payload: data });
    } catch (error: any) {
      let message = "Unhandled error";

      message = error.response?.data?.message || error.message;

      dispatch({ type: "rejected", error: { message } });
    }
  };
