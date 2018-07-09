const expect = require('expect');

const {isRealString} = require('./validation');

describe('Check for Real Strings');
it('should reject non-string values', () => {
  var test1 = isRealString(234);
  var test2 = isRealString('    ');
  var test3 = isRealString('tnbngb');

  expect(test1).toBe(false);
  expect(test2).toBe(false);
  expect(test3).toBe(true);
});
