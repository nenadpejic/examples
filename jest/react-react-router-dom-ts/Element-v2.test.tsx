import { Router } from 'react-router-dom'

describe("<Element />", () => {
  let history: MemoryHistory<unknown>

  beforeEach(() => {
    history = createMemoryHistory()

    render(
      <Router history={history}>
        <Element />
      </Router>
    )
  })

  it("should route", () => {
    userEvent.click(newRouteBtn)

    expect(history.location.pathname).toBe('/new-route')
  })
})