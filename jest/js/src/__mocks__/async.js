const functions = {
  getUserById: async (id) => {
    return new Promise((resolve, reject) => {
      const user = {
        "id": 1,
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz",
      }
      if (id === 1) {
        resolve(user)
      } else if (id === -1) {
        reject({
          message: 'Request failed with status code 404'
        })
      }
    })
  }
}

module.exports = functions
