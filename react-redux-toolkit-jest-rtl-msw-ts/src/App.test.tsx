import React from 'react';
import App from './App';
import userEvent from '@testing-library/user-event';
import { render, screen } from 'jest/jest-utils';
import server from 'mocks/server';
import { getAllTodosHandlerError500 } from 'mocks/handlers';

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

    server.use(getAllTodosHandlerError500)
    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Internal server error")).toBeInTheDocument()
  })
})
