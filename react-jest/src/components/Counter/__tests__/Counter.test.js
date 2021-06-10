import { cleanup, fireEvent, render } from "@testing-library/react"
import Counter from "../Counter"

let getByTestId

beforeEach(() => {
  getByTestId = render(<Counter />).getByTestId
})

afterEach(() => {
  // done by default if via create-react-app
  cleanup()
})

test('header renders', () => {
  const headerEl = getByTestId('header')

  expect(headerEl).toBeTruthy()
})

test('header renders with correct text', () => {
  const headerEl = getByTestId('header')

  expect(headerEl.textContent).toBe('Counter')
})

test('counter text content initialy is 0', () => {
  const counterEl = getByTestId('counter')

  expect(counterEl.textContent).toBe('0')
})

test('input value initialy is 1', () => {
  const inputEl = getByTestId('input')

  expect(inputEl.value).toBe('1')
})

test('add button text content is +', () => {
  const addBtn = getByTestId('add-btn')

  expect(addBtn.textContent).toBe('+')
})

test('subtract button text content is -', () => {
  const subtractBtn = getByTestId('subtract-btn')

  expect(subtractBtn.textContent).toBe('-')
})

test('changing value of input works correctly', () => {
  const inputEl = getByTestId('input')

  fireEvent.change(inputEl, {
    target: {
      value: '1'
    }
  })

  expect(inputEl.value).toBe('1')
})

describe('counter element', () => {
  test('clicking on add button adds 1 to counter', () => {
    const addBtn = getByTestId('add-btn')
    const counterEl = getByTestId('counter')

    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe('1')
  })

  test('clicking on subtract button subtracts 1 from counter', () => {
    const subtractBtn = getByTestId('subtract-btn')
    const counterEl = getByTestId('counter')

    fireEvent.click(subtractBtn)

    expect(counterEl.textContent).toBe('-1')
  })

  test('changing input value and clicking on add button works correctly', () => {
    const addBtn = getByTestId('add-btn')
    const counterEl = getByTestId('counter')
    const inputEl = getByTestId('input')

    fireEvent.change(inputEl, {
      target: {
        value: 5
      }
    })
    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe('5')
  })

  test('changing input value and clicking on subtract button works correctly', () => {
    const subtractBtn = getByTestId('subtract-btn')
    const counterEl = getByTestId('counter')
    const inputEl = getByTestId('input')

    fireEvent.change(inputEl, {
      target: {
        value: 5
      }
    })
    fireEvent.click(subtractBtn)

    expect(counterEl.textContent).toBe('-5')
  })

  test('adding and subtracting leads to the correct counter number', () => {
    const addBtn = getByTestId('add-btn')
    const subtractBtn = getByTestId('subtract-btn')
    const counterEl = getByTestId('counter')
    const inputEl = getByTestId('input')

    fireEvent.change(inputEl, {
      target: {
        value: 5
      }
    })
    fireEvent.click(addBtn)

    expect(counterEl.textContent).toBe('5')

    fireEvent.click(subtractBtn)
    fireEvent.click(subtractBtn)

    expect(counterEl.textContent).toBe('-5')
  })

  test('counter contains correct className', () => {
    const addBtn = getByTestId('add-btn')
    const subtractBtn = getByTestId('subtract-btn')
    const counterEl = getByTestId('counter')
    const inputEl = getByTestId('input')

    expect(counterEl.className).toBe('')

    fireEvent.change(inputEl, {
      target: {
        value: '100'
      }
    })
    fireEvent.click(addBtn)

    expect(counterEl.className).toBe('green')

    fireEvent.click(subtractBtn)
    fireEvent.click(subtractBtn)

    expect(counterEl.className).toBe('red')
  })
})
