import userEvent from '@testing-library/user-event';
import { render, screen } from 'jest/jest-utils';
import { todosGetAllHandlerError500 } from 'mocks/handlers';
import server from 'mocks/server';
import React from 'react';
import App from './App';

describe("<App />", () => {
  beforeEach(() => {
    render(
      <App />,
      {
        withStore: true
      }
    )
  })

  it("renders correctly", () => { })

  it("renders todos on button click", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    expect(screen.getByRole("list")).toBeEmptyDOMElement()

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test title")).toBeInTheDocument()
  })

  it("renders error message if getAllTodos rejected", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    server.use(todosGetAllHandlerError500)
    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Internal server error")).toBeInTheDocument()
  })

  it("updates todo when Edit button is clicked", async () => {
    const getTodosBtn = screen.getByRole("button", { name: "Get Todos" })

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test title")).toBeInTheDocument()

    const editBtn = screen.getByRole("button", { name: "Edit" })

    userEvent.click(editBtn)

    await screen.findByRole("progressbar")

    const todoSpanEl = await screen.findByText("Test title")

    expect(todoSpanEl).toHaveStyle("text-decoration: line-through")
  })
})
