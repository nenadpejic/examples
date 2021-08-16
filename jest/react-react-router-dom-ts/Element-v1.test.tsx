import { BrowserRouter as Router } from 'react-router-dom'

const mockHistoryPush = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

describe("<Element />", () => {
  beforeEach(() => {
    render(
      <Router>
        <Element />
      </Router>
    )
  })

  it("should route", () => {
    userEvent.click(newRouteBtn)

    expect(mockHistoryPush).toHaveBeenCalledWith("/new-route")
  })
})