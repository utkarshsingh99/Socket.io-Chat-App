const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');

var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected: `);

  socket.on('connect', () => {
    console.log(`Connection established`);
  });

  socket.on('disconnect', () => {
    console.log(`Connection broken`);
  });

  socket.on('createMessage', (message) => {
    console.log(`Message received:\n ${message.text} SENT BY ${message.from}`);
    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
