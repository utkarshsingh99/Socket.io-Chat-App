const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: 1,
      name: 'Utkarsh',
      room: 'Node Course'
    }, {
      id: 2,
      name: 'Utki',
      room:'Node Course'
    }, {
      id: 3,
      name: 'DS',
      room: 'React Course'
    }];
  });

  it('should add new User', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'Utkarsh',
      room: 'The Office Fans'
    };
    var resUser = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a User', () => {
    var deletedUser = users.removeUser(1);

    expect(deletedUser).toEqual({
      id: 1,
      name: 'Utkarsh',
      room: 'Node Course'
    });
    expect(users.users).toEqual([{
      id: 2,
      name: 'Utki',
      room:'Node Course'
    }, {
      id: 3,
      name: 'DS',
      room: 'React Course'
    }]);
  });

  it('should get User list', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Utkarsh', 'Utki']);
  });

  it('should get React User list', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['DS']);
  });

});
