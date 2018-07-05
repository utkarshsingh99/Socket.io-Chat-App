var socket = io();
socket.on('connect', function () {
  console.log(`Connected to server`);
});

socket.on('newMessage', function (message) {
  console.log(`New Message: \n`, message.text, ' SENT BY ', message.from,' at ', message.createdAt);
});


socket.on('disconnect', function () {
  console.log(`Disconnected`);
});
