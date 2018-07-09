const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const publicPath = path.join(__dirname, '../public');
var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log(`New user connected: `);

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required');
    }
  })

  socket.on('createMessage', (message, callback) => {
    console.log(`Message received:\n ${message.text} SENT BY ${message.from}`);
    io.emit('newMessage', generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    console.log(`Connection broken`);
  });
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
