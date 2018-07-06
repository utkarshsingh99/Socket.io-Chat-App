var socket = io();
socket.on('connect', function () {
  console.log(`Connected to server`);
});

socket.on('newJoin', function (message) {
  console.log('newMessage', message);
});

socket.on('disconnect', function () {
  console.log(`Disconnected`);
});
