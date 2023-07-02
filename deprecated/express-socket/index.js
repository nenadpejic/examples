const express = require("express")
const path = require("path")
const { createServer } = require("http")
const { Server, Socket } = require("socket.io")

const app = express()

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

const httpServer = createServer(app)
const io = new Server(httpServer, {})

httpServer.listen(3000, () => {
  console.log('Listening on port 3000')
})

io.on('connection', (socket) => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('User disconnected')
  })

  socket.on('chat-message-client', (msg) => {
    console.log('msg:', msg)
    io.emit('chat-message-server', msg)
  })
})
