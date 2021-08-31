import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import userEvent from '@testing-library/user-event';

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

  // it("should display error message if getAllTodosService failed", async () => {
  //   const getTodosBtn = screen.getByText("Get Todos")

  //   jest.spyOn(axiosJsonplaceholder, "get").mockRejectedValueOnce({ message: "Test error" })
  //   userEvent.click(getTodosBtn)

  //   expect(await screen.findByText("Test error")).toBeInTheDocument()
  // })
})
