import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("userEvent", () => {
  it("focus", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    )

    const [checkbox, radio, number] = getAllByTestId("element")
    userEvent.tab()
    expect(checkbox).toHaveFocus()
    userEvent.tab()
    expect(radio).toHaveFocus()
    userEvent.tab()
    expect(number).toHaveFocus()
  })

  it("select option", () => {
    const { getByRole, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    )

    userEvent.selectOptions(getByRole("combobox"), "1")
    expect(getByText("A").selected).toBeTruthy()

    userEvent.selectOptions(getByRole("combobox"), "2")
    expect(getByText("B").selected).toBeTruthy()
    expect(getByText("A").selected).toBeFalsy()
  })
})