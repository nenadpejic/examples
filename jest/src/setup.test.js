const functions = require('./setup')

// Setup and Teardown
test('database check 1', () => {
  expect(true).toBe(true)
})

test('database check 2', () => {
  expect(true).toBe(true)
})

// Repeating for every test within file
beforeEach(() => {
  functions.initializeDatabase()
})

afterEach(() => {
  functions.clearDatabase()
})

// Running once at start and end of file
beforeAll(() => {
  functions.initializeDatabase()
})

afterAll(() => {
  functions.clearDatabase()
})

// Scoping
describe('checking Database', () => {
  beforeEach(() => functions.initializeDatabase())

  test('database check 3', () => {
    expect(true).toBe(true)
  })
})

// Run only specific test
test.only('run only this test', () => {
  expect(true).toBe(true)
})
