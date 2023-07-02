// NOTE: Not used currently!

export const getAllTodosService = () => new Promise((resolve, reject) => {
  const todos = [{
    userId: 1,
    id: 1,
    title: "Test title",
    completed: true
  }]
  process.nextTick(() => {
    resolve(todos)
    reject({ message: "Test error" })
  })
})
