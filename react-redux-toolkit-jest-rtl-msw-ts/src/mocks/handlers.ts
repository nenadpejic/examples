import { rest } from 'msw'
import { TodosGetAllResponseBody } from 'redux/todos/todosGetAll/todosGetAllTypes'
import { TodoUpdateRequestBody, TodoUpdateRequestParams, TodoUpdateResponseBody } from 'redux/todos/todoUpdate/todoUpdateTypes'
import { baseURL } from 'services/axios'

const todosGetAllHandler = rest.get<
  undefined,
  TodosGetAllResponseBody,
  {}
>(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(200),
    ctx.json([
      {
        userId: 1,
        id: 1,
        title: "Test title",
        completed: false
      }
    ])
  )
})

export const todosGetAllHandlerError500 = rest.get<
  undefined,
  { message: string },
  {}
>(`${baseURL}/todos`, (req, res, ctx) => {
  return res(
    ctx.status(500),
    ctx.json({ message: 'Internal server error' })
  )
})

export const todoUpdateHandler = rest.put<
  TodoUpdateRequestBody,
  TodoUpdateResponseBody,
  TodoUpdateRequestParams
>(`${baseURL}/todos/:id`, (req, res, ctx) => {
  const { body } = req
  const id = Number(req.params.id)

  return res(
    ctx.status(200),
    ctx.json({
      ...body,
      id
    })
  )
})

const handlers = [
  todosGetAllHandler,
  todoUpdateHandler
]

export default handlers

