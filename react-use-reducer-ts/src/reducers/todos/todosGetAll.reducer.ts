import { TodosGetAllAction, TodosGetAllState } from "./todosGetAll.types";

export const todosGetAllState: TodosGetAllState = {
  isLoading: false,
  todos: undefined,
  error: undefined,
};

const todosGetAllReducer = (
  state: TodosGetAllState = todosGetAllState,
  action: TodosGetAllAction
) => {
  switch (action.type) {
    case "pending":
      return {
        ...state,
        isLoading: true,
      };

    case "fulfilled":
      return {
        isLoading: false,
        todos: action.payload,
        error: undefined,
      };

    case "rejected":
      return {
        isLoading: false,
        todos: undefined,
        error: action.error,
      };

    default:
      return todosGetAllState;
  }
};

export default todosGetAllReducer;
