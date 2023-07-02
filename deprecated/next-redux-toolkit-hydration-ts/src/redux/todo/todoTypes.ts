export type Todo = {
  userId: number
  id: number
  title: string
  completed: string
}

export interface TodoState {
  isLoading: boolean
  error?: RejectError
  todos?: Todo[]
}


export interface RejectError {
  name?: string
  code?: number
  message?: string
}
