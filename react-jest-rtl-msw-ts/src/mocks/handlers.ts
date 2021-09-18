import { rest } from 'msw'
import { baseURL } from 'services/axios'
import { AddTodoRequestBody, AddTodoResponseBody, GetAllTodosResponseBody } from 'services/todos.types'

const getAllTodosHandler = rest.get<
  undefined,
  GetAllTodosResponseBody,
  {}
>(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([{
      userId: 1,
      id: 1,
      title: "Test title",
      completed: true
    }])
  )
})

export const getAllTodosFail500 = rest.get<
  undefined,
  { message: string },
  {}
>(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ message: "Internal server error" })
  )
})

const addTodoHandler = rest.post<
  AddTodoRequestBody,
  AddTodoResponseBody,
  {}
>(`${baseURL}/todos`, (req, res, ctx) => {
  const { body } = req

  return res(
    ctx.status(200),
    ctx.json({
      ...body,
      id: new Date().getTime()
    })
  )
})

export const addTodoFail500 = rest.post<
  AddTodoRequestBody,
  { message: string },
  {}
>(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ message: "Internal server error" })
  )
})

export const handlers = [
  getAllTodosHandler,
  addTodoHandler
]
