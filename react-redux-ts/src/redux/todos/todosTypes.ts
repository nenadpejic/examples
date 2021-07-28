interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export interface TodosGetAllState {
  loading: boolean
  todos?: Todo[]
  error?: { message: string }
}

export interface TodosGetAllAction {
  type: "todosGetAll/pending" | "todosGetAll/fulfilled" | "todosGetAll/rejected"
  payload?: TodosGetAllState["todos"]
  error?: TodosGetAllState["error"]
}
