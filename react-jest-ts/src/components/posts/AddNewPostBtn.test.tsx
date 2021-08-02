import { fireEvent, render, screen } from "@testing-library/react"
import AddNewPostBtn from "./AddNewPostBtn"

describe("AddNewPostBtn", () => {
  test("button onClick should trigger onClick callback", () => {
    const handleClickMock = jest.fn()
    render(<AddNewPostBtn onClick={handleClickMock} />)

    fireEvent.click(screen.getByText("Add New Post"))

    expect(handleClickMock).toHaveBeenCalled()
  })
})