var socket = io();
socket.on('connect', function () {
  console.log(`Connected to server`);
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  li.text(`${message.from} ${formattedTime}: ${message.text}`);

  jQuery('#messageList').append(li);
});

socket.on('disconnect', function () {
  console.log(`Disconnected`);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My Current Location</a>');
  li.text(`${message.from}: My `);
  a.attr(`href`,message.url);
  li.append(a);
  var time = `at ${formattedTime}`;
  li.append(time);
  jQuery('#messageList').append(li);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextBox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: `User`,
    text: messageTextBox.val()
  }, function () {
    messageTextBox.val('');
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if(!navigator.geolocation) {
    return alert(`geolocation not there!`)
  }

  locationButton.attr('disabled', 'disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location!');
    locationButton.removeAttr('disabled').text('Send Location');
  })
});
