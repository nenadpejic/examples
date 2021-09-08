import { rest } from 'msw'
import { baseURL } from 'services/axios'

const getAllTodosHandler = rest.get(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        userId: 1,
        id: 1,
        title: "Test title",
        completed: true
      }
    ])
  )
})

export const getAllTodosHandlerError500 = rest.get(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ message: 'Internal server error' })
  )
})

const handlers = [getAllTodosHandler]

export default handlers