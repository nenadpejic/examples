const axios = require('axios')

const functions = {
  getSum: (num1, num2) => num1 + num2,
  getNull: () => null,
  getUndefined: () => undefined,
  getDefined: (x = 1) => x,
  getTruthy: () => 1,
  getFalsy: () => 0,
  getUser: () => ({
    firstName: 'John',
    lastName: 'Doe'
  }),
  getGreatherThan: () => 2 + 2,
  getMatch: () => 'Cristoph',
  getUsernames: () => ['admin', 'john'],
  fetchTodo: async () => {
    try {
      const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')
      return data
    } catch (err) {
      return err
    }
  },
}

module.exports = functions
