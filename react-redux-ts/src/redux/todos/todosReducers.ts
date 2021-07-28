import { TodosGetAllAction, TodosGetAllState } from "./todosTypes";

const initialState: TodosGetAllState = {
  loading: false,
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
        loading: true,
        todos: state.todos,
        error: state.error
      };
    case "todosGetAll/fulfilled":
      return {
        loading: false,
        todos: action.payload,
      };
    case "todosGetAll/rejected":
      return {
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
