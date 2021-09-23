import { TodosGetAllAction, TodosGetAllState } from "./todosTypes";

const initialState: TodosGetAllState = {
  isLoading: false,
  todos: undefined,
  error: undefined
}

export const todosGetAllReducer = (
  state = initialState,
  action: TodosGetAllAction
) => {
  switch (action.type) {
    case "todosGetAll/pending":
      return {
        isLoading: true,
        todos: state.todos,
        error: state.error
      };
    case "todosGetAll/fulfilled":
      return {
        isLoading: false,
        todos: action.payload,
      };
    case "todosGetAll/rejected":
      return {
        isLoading: false,
        error: action.error,
      };
    case "todosGetAllReset":
      return initialState;
    default:
      return state;
  }
}
