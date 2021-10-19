import { Todo } from "./todo.type";

export interface TodosGetAllState {
  isLoading: boolean;
  todos?: Todo[];
  error?: { message: string };
}

interface TodosGetAllActionPending {
  type: "pending";
}

interface TodosGetAllActionFulfilled {
  type: "fulfilled";
  payload: Todo[];
}

interface TodosGetAllActionRejected {
  type: "rejected";
  error: { message: string };
}

export type TodosGetAllAction =
  | TodosGetAllActionPending
  | TodosGetAllActionFulfilled
  | TodosGetAllActionRejected;
