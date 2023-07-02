import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { addTodoFail500, getAllTodosFail500 } from 'mocks/handlers';
import { server } from 'mocks/server';
import React from 'react';
import App from './App';

describe("<App />", () => {
  beforeEach(() => {
    render(<App />)
  })

  it('should render', () => { })

  it("should render todos on button click", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    expect(screen.getByRole("list")).toBeEmptyDOMElement()

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test title")).toBeInTheDocument()
  })

  it("should display error message if getAllTodos failed", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    server.use(getAllTodosFail500)

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Internal server error")).toBeInTheDocument()
  })

  it("should render new added todo on button click", async () => {
    const addTodoBtn = screen.getByText("Add Todo")

    userEvent.click(addTodoBtn)

    expect(await screen.findByText("New added todo")).toBeInTheDocument()
  })

  it("should display error message if addTodo failed", async () => {
    const addTodoBtn = screen.getByText("Add Todo")

    server.use(addTodoFail500)

    userEvent.click(addTodoBtn)

    expect(await screen.findByText("Internal server error")).toBeInTheDocument()
  })
})
