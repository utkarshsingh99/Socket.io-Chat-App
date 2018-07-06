var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from =  `Admin`;
    var text = 'Some message';
    var message = generateMessage(from, text);

    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var  from = 'Admin';
    var latitude = 13, longitude = 26;
    var location = generateLocationMessage(from, latitude, longitude);
    expect(location.from).toBe('Admin');
    expect(location.createdAt).toBeA('number');
    expect(location.url).toBe('https://www.google.com/maps?q=13,26')
  });
})
