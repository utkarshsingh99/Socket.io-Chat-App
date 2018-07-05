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

  socket.emit('newJoin', {
    from: `Admin`,
    text: `Welcome to the Chat Group`,
    createdAt: new Date().getTime()
  });

  socket.broadcast.emit('notifyJoin', {
    from: `Admin`,
    text: `New User Joined`,
    createdAt: new Date().getTime()
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
    // socket.broadcast.emit('newMessage', {
    //    from: message.from,
    //    text: message.text,
    //    createdAt: new Date().getTime()
    // });
  });
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
