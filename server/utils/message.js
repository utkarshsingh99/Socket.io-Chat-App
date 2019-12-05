var moment = require('moment');
var fs = require('fs');

// class Message {
//   constructor () {
//     this.messages = [];
//   }
//   addMessage(from, text, room) {
//     var message = generateMessage(from, text, room);
//     this.messages.push(message);
//     console.log('List of messages')
//     console.table(this.messages)
//     return message;
//   }
//   getMessages(room) {
//     return this.messages.filter((message) => message.room == room)[0];
//   }
// }

class Message {
  constructor() {
    this.messages = [];
  }
  addMessage(from, text, room) {
    var message = generateMessage(from, text, room);
    this.messages.push(message);

    appendToFile(message);

    fs.appendFile('messages.txt', JSON.stringify(message), (err) => {
      if(err)
        console.log('Unable to save file! ', err);
    })
    console.log(this.messages);
    return message;
  }
  loadMessages() {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
      console.log('Loading data');
      data = JSON.parse(data);
      console.log(typeof data, data);
      this.messages = data;
      // this.messages 
    })
  }
  getMessages(room) {
    return this.messages.filter((mess) => mess.room === room);
  }
}

var appendToFile = (message) => {
  let tempMessages = [];
  fs.readFile('messages.txt', 'utf8', (err, data) => {
    if(err)
      return ;
    tempMessages = JSON.parse(data);
    tempMessages.push(message);
    fs.writeFile('messages.txt', JSON.stringify(tempMessages), (err) => {
      if(err)
        console.log('Unable to save file', err);
    })
  })
}

var generateMessage = (from, text, room) => {
  return {
    from,
    text,
    room,
    createdAt: moment().valueOf()
  };
};

var generateLocationMessage = (from, latitude, longitude, room) => {
  return {
    from,
    url: `https://www.google.com/maps?q=${latitude},${longitude}`,
    createdAt: moment().valueOf(),
    room
  };
}

module.exports = {Message, generateMessage, generateLocationMessage};
