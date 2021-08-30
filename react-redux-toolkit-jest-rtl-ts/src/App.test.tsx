import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "App"
import { Provider } from "react-redux"
import store from "redux/store"
import { axiosJsonplaceholder } from "services/axios"

jest.mock("services/axios")

describe("<App />", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })

  it("should render", () => { })

  it("should render todos on button click", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    expect(screen.getByRole("list")).toBeEmptyDOMElement()

    jest.spyOn(axiosJsonplaceholder, "get").mockResolvedValueOnce({
      data: [{
        userId: 1,
        id: 1,
        title: "Test title",
        completed: true
      }]
    })
    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test title")).toBeInTheDocument()
  })

  it("should display error message if getAllTodosService failed", async () => {
    const getTodosBtn = screen.getByText("Get Todos")

    jest.spyOn(axiosJsonplaceholder, "get").mockRejectedValueOnce({ message: "Test error" })
    userEvent.click(getTodosBtn)

    expect(await screen.findByText("Test error")).toBeInTheDocument()
  })
})
