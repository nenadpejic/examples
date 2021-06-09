const functions = {
  getSum: (num1, num2) => num1 + num2,
  getNull: () => null,
  getUndefined: () => undefined,
  getDefined: (x) => x,
  getTruthy: () => 1,
  getFalsy: () => 0,
  getNumber: () => 4,
  getString: () => 'Cristoph',
  getObject: () => ({
    firstName: 'John',
    lastName: 'Doe'
  }),
  getArray: () => ['admin', 'john'],
}

module.exports = functions
