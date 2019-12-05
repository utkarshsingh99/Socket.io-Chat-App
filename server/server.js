const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {Message, generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '../public');
var app = express();
const port = process.env.PORT || 3000;
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();
var incomingmessage = new Message();

incomingmessage.loadMessages();
app.use(express.static(publicPath));

io.on('connection', (socket) => {

  socket.on('join', (params, callback) => {
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and room name are required');
    }

    socket.join(params.room);

    users.addUser(socket.id, params.name, params.room);

    // Send all messages of the group to the user here
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat App'));
    socket.emit('getMessages', incomingmessage.getMessages(params.room));

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text, user.room));
      console.log(message);
      incomingmessage.addMessage(user.name, message.text, user.room);
      callback();
    }
  });

  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);

    if(user && isRealString(message.text)) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
      callback();
    }
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
    }
  });
});

server.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
