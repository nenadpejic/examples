const functions = require('./functions')

// Common Matchers
// .toBe()
test('adds 2 + 2 to equal 4', () => {
  expect(functions.getSum(2, 2)).toBe(4)
})

// .not.toBe()
test('adds 2 + 2 to NOT equal 0', () => {
  expect(functions.getSum(2, 2)).not.toBe(0)
})

// Truthiness
// .toBeNull()
test('should be null', () => {
  expect(functions.getNull()).toBeNull()
})

// .toBeUndefined()
test('should be undefined', () => {
  expect(functions.getUndefined()).toBeUndefined()
})

// .toBeDefined()
test('should be defined', () => {
  expect(functions.getDefined()).toBeDefined()
})

// .toBeTruthy()
test('should be truthy', () => {
  expect(functions.getTruthy()).toBeTruthy()
})

// .toBeFalsy()
test('should be falsy', () => {
  expect(functions.getFalsy()).toBeFalsy()
})

// Objects
// .toEqual()
test('should be object', () => {
  expect(functions.getUser()).toEqual({ firstName: 'John', lastName: 'Doe', x: undefined })
})

// .toStrictEqual()
test('should be object', () => {
  expect(functions.getUser()).toStrictEqual({ firstName: 'John', lastName: 'Doe' })
})

// Numbers
// .toBeLessThan()
test('adds 2 + 2 to be greather than 3', () => {
  expect(functions.getGreatherThan()).toBeGreaterThan(3);
  // expect(value).toBeGreaterThanOrEqual(3.5);
  // expect(value).toBeLessThan(5);
  // expect(value).toBeLessThanOrEqual(4.5);
})

// Strings
// .toMatch()
test('should match stop', () => {
  expect(functions.getMatch()).toMatch(/stop/)
})

// Arrays
// .toContain()
test('usernames should contain admin', () => {
  expect(functions.getUsernames()).toContain('admin')
})

// Asynchronous code
test('todo should not be completed', async () => {
  const data = await functions.fetchTodo()
  expect(data.completed).toBe(false)
})

test('no network error', async () => {
  expect.assertions(1)
  const err = await functions.fetchTodo()
  expect(err.message).not.toBe('Request failed with status code 404')
})
