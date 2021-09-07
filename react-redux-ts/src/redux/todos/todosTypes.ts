interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodosGetAllState {
  isLoading: boolean
  todos?: Todo[]
  error?: { message: string }
}

interface TodosGetAllPendingAction {
  type: "todosGetAll/pending"
}

interface TodosGetAllFulfilledAction {
  type: "todosGetAll/fulfilled"
  payload: Todo[]
}

interface TodosGetAllRejectedAction {
  type: "todosGetAll/rejected"
  error: { message: string }
}

export type TodosGetAllAction = TodosGetAllPendingAction | TodosGetAllFulfilledAction | TodosGetAllRejectedAction
