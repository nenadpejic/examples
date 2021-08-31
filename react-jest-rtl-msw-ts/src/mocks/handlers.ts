import { rest } from 'msw'
import { baseURL } from 'services/axios'

export const handlers = [
  rest.get(`${baseURL}/todos`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([{
        userId: 1,
        id: 1,
        title: "Test title",
        completed: true
      }]
      )
    )
  }),
]
