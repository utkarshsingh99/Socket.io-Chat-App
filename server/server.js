const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected: `);

  socket.emit('newJoin', generateMessage('Admin', 'Welcome to the Chat App'));

  socket.broadcast.emit('newJoin', generateMessage('Admin', 'New User joined'));

  socket.on('createMessage', (message) => {
    console.log(`Message received:\n ${message.text} SENT BY ${message.from}`);
    io.emit('newMessage', generateMessage(message.from, message.text));
    // socket.broadcast.emit('newMessage', {
    //    from: message.from,
    //    text: message.text,
    //    createdAt: new Date().getTime()
    // });
  });

  socket.on('disconnect', () => {
    console.log(`Connection broken`);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
