import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import Posts from "./Posts"

const mockPostsData = [
  {
    "userId": 1,
    "id": 1,
    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
  },
  {
    "userId": 1,
    "id": 2,
    "title": "qui est esse",
    "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
  },
  {
    "userId": 1,
    "id": 3,
    "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
    "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
  },
]

const mockNewPostData = {
  "userId": 1,
  "id": 4,
  "title": "New Title",
  "body": "New Body\n New line"
}

describe("Posts", () => {
  beforeEach(() => {
    global.fetch = jest.fn((url, options) => {
      if (options?.method === "POST") {
        return Promise.resolve({
          json: () => Promise.resolve(mockNewPostData)
        })
      } else {
        return Promise.resolve({
          json: () => Promise.resolve(mockPostsData)
        })
      }
    })
  })

  // v1
  test("fetch and render posts v1", async () => {
    await act(async () => render(<Posts />))

    mockPostsData.forEach(post => expect(screen.getByText(post.title)).toBeInTheDocument())
  })

  // v2
  test("fetch and render posts v2", async () => {
    render(<Posts />)

    expect(window.fetch).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/posts")

    await waitFor(() => mockPostsData.forEach(post => expect(screen.getByText(post.title)).toBeInTheDocument()))
  })

  test("click on cancel should hide the form and reset input to default form", async () => {
    render(<Posts />)

    await waitFor(() => fireEvent.click(screen.getByText("Add New Post")))

    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument()

    // Using fireEvent
    // fireEvent.change(screen.getByPlaceholderText("Title"), {
    //   target: { value: "New Post Title" }
    // })

    // Using userEvent.type
    userEvent.type(screen.getByPlaceholderText("Title"), "New Post Title")

    expect(screen.queryByPlaceholderText("Title").value).toBe("New Post Title")

    fireEvent.click(screen.getByText("Cancel"))

    // Using userEvent.click
    // userEvent.click(screen.getByText("Cancel"), {ctrlKey: true})

    expect(screen.queryByPlaceholderText("Title")).not.toBeInTheDocument()

    fireEvent.click(screen.getByText("Add New Post"))

    expect(screen.queryByPlaceholderText("Title").value).toBe("")
  })

  test("create and render a new post and submit a form", async () => {
    render(<Posts />)

    // Open the form
    await waitFor(() => fireEvent.click(screen.getByText("Add New Post")))

    const titleInputEl = screen.getByPlaceholderText("Title")
    const bodyInputEl = screen.getByPlaceholderText("Body")
    const submitBtnEl = screen.getByRole("button", { name: "Submit" })

    expect(titleInputEl.value).toBe("")
    expect(bodyInputEl.value).toBe("")
    expect(submitBtnEl).toBeInTheDocument()

    // Start typing
    fireEvent.change(titleInputEl, { target: { value: mockNewPostData.title } })
    fireEvent.change(bodyInputEl, { target: { value: mockNewPostData.body } })

    // Submit the form
    await waitFor(() => fireEvent.click(submitBtnEl))

    // Form should be hidden
    expect(titleInputEl).not.toBeInTheDocument()
    expect(bodyInputEl).not.toBeInTheDocument()

    // New post is displayed
    expect(screen.getByText(mockNewPostData.title)).toBeInTheDocument()
    expect(screen.getByText(/New Body/)).toBeInTheDocument()
  })
})
