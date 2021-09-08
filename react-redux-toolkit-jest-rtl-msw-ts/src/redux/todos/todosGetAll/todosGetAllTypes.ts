export interface Todo {
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
