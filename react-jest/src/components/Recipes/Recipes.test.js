import { render, screen } from "@testing-library/react"
import Recipes from "./Recipes"

import { setupServer } from 'msw/node'
import { rest } from "msw"

const recipes = [
  { id: 1, title: 'Burger' },
  { id: 2, title: 'French toast' },
  { id: 3, title: 'Salmon' }
]

const server = setupServer(
  rest.get('/api/recipes', (req, res, ctx) => {
    return res(ctx.json({ recipes }))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


test('renders the heading, form elements, and recipe list', async () => {
  render(<Recipes />)

  expect(screen.getByRole('heading')).toHaveTextContent('Recipe Finder')
  expect(screen.getByPlaceholderText('Enter an ingredient to find recipes...')).toBeInTheDocument()
  expect(screen.getByRole('button')).toHaveTextContent('Find')

  const listItems = await screen.findAllByRole('listitem')
  expect(listItems).toHaveLength(3)
  expect(listItems[0]).toHaveTextContent('Burger')
  expect(listItems[1]).toHaveTextContent('French toast')
  expect(listItems[2]).toHaveTextContent('Salmon')
})

test('displays error message when fetching recipes is unsuccessful', async () => {
  server.use(
    rest.get('/api/recipes', (req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ message: 'Internal server error' })
      )
    })
  )

  render(<Recipes />)

  expect(await screen.findByText('Failed to fetch recipes')).toBeInTheDocument()
  expect(screen.queryByRole('listitem')).not.toBeInTheDocument()
})