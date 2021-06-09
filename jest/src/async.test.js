jest.mock('./async.js')

const functions = require('./async')

// Testing Asynchronous Code
// promise
test('username should be Bret, for id: 1', () => {
  expect.assertions(1)
  return functions.getUserById(1)
    .then(user => {
      expect(user.username).toBe('Bret')
    })
})

// async await
test('username should be Bret, for id: 1', async () => {
  expect.assertions(1)
  const user = await functions.getUserById(1)
  expect(user.username).toBe('Bret')
})

// error handling
test('should fail with status code 404, for id: -1', async () => {
  expect.assertions(1)
  try {
    await functions.getUserById(-1)
  } catch (err) {
    expect(err.message).toEqual('Request failed with status code 404')
  }
})
