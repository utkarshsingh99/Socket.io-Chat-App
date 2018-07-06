var socket = io();
socket.on('connect', function () {
  console.log(`Connected to server`);
});

socket.on('newMessage', function (message) {
  console.log('newMessage', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messageList').append(li);
});

socket.on('disconnect', function () {
  console.log(`Disconnected`);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: `User`,
    text: jQuery('#message').val()
  }, function (data) {

  });
});
