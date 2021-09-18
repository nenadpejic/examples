export interface Todo {
  userId: number
  id: number
  title: string
  completed: boolean
}

export type GetAllTodosResponseBody = Todo[]

export type AddTodoRequestBody = Omit<Todo, "id">

export type AddTodoResponseBody = Todo
