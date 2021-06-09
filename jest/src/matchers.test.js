const functions = require('./matchers')

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
  expect(functions.getDefined(123)).toBeDefined()
})

// .toBeTruthy()
test('should be truthy', () => {
  expect(functions.getTruthy()).toBeTruthy()
})

// .toBeFalsy()
test('should be falsy', () => {
  expect(functions.getFalsy()).toBeFalsy()
})

// Numbers
// .toBeLessThan()
test('4 to be greather than 3', () => {
  expect(functions.getNumber()).toBeGreaterThan(3);
  // expect(value).toBeGreaterThanOrEqual(3.5);
  // expect(value).toBeLessThan(5);
  // expect(value).toBeLessThanOrEqual(4.5);
})

// Strings
// .toMatch()
test('string should match stop', () => {
  expect(functions.getString()).toMatch(/stop/)
})

// Objects
// .toEqual()
test('should be object', () => {
  expect(functions.getObject()).toEqual({
    firstName: 'John',
    lastName: 'Doe',
    x: undefined
  })
})

// .toStrictEqual()
test('should be object', () => {
  // would fail with an extra field
  expect(functions.getObject()).toStrictEqual({
    firstName: 'John',
    lastName: 'Doe',
  })
})

// Arrays
// .toContain()
test('usernames should contain admin', () => {
  expect(functions.getArray()).toContain('admin')
})
