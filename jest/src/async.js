const axios = require('axios')

const functions = {
  getUserById: async (id) => {
    // promise
    // return axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    //   .then(res => res.data)

    // async and await
    const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    return data
  }
}

module.exports = functions
