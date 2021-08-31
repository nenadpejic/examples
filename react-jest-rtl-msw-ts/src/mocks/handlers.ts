import { rest } from 'msw'
import { baseURL } from 'services/axios'

export const getAllTodosSuccess = rest.get(`${baseURL}/todos`, (req, res, ctx) => {
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

export const getAllTodosFail500 = rest.get(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ message: "Internal server error" })
  )
})

export const addTodoSuccess = rest.post(`${baseURL}/todos`, (req, res, ctx) => {
  const { body } = req

  return res(
    ctx.status(200),
    ctx.json({
      ...body as {},
      id: 201
    })
  )
})

export const addTodoFail500 = rest.post(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ message: "Internal server error" })
  )
})

export const handlers = [
  getAllTodosSuccess,
  addTodoSuccess
]
