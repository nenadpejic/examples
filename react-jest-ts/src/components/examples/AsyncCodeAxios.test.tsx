import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import axios from "axios"
import { act } from "react-dom/test-utils"
import AsyncCodeAxios from "./AsyncCodeAxios"

jest.mock("axios")

const hits = [
  {
    objecID: "1",
    title: "Angular"
  },
  {
    objecID: "2",
    title: "React"
  }
]

describe("AsyncCodeAxios", () => {
  it("fethes news from an API", async () => {
    axios.get.mockImplementationOnce(() => Promise.resolve({ data: { hits } }))
    const { getByRole, findAllByRole } = render(<AsyncCodeAxios />)

    userEvent.click(getByRole("button"))

    expect(axios.get).toHaveBeenCalledTimes(1)
    expect(axios.get).toHaveBeenCalledWith("https://hn.algolia.com/api/v1/search?query=React")

    const items = await findAllByRole("listitem")
    expect(items).toHaveLength(2)
  })

  it("fethes news from an API and rejected", async () => {
    axios.get.mockImplementationOnce(() => Promise.reject(new Error()))
    const { getByRole, findByText } = render(<AsyncCodeAxios />)

    userEvent.click(getByRole("button"))

    const message = await findByText(/Something went wrong/)
    expect(message).toBeInTheDocument()
  })

  it("fethes news from an API v2 using act()", async () => {
    const promise = Promise.resolve({ data: { hits } })
    axios.get.mockImplementationOnce(() => promise)
    const { getByRole, getAllByRole } = render(<AsyncCodeAxios />)

    userEvent.click(getByRole("button"))

    await act(() => promise)
    expect(getAllByRole("listitem")).toHaveLength(2)
  })
})
