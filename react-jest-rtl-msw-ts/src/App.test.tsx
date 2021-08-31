import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getAllTodosFail500, getAllTodosSuccess } from 'mocks/handlers';
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

  it("test", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    expect(screen.getByRole("list")).toBeEmptyDOMElement()

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test title")).toBeInTheDocument()

    server.use(getAllTodosFail500)

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Internal server error")).toBeInTheDocument()

    server.use(getAllTodosSuccess)

    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test title")).toBeInTheDocument()
  })
})
