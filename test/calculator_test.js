
var assert = chai.assert;

describe('add', function() {
  it('should add two numbers together', function() {

    var result = doOperation(2.3, 8.998, add);
    assert.equal(result, 11.298);
  });
});

describe('divide', function() {
  it('should divide the 2 numbers', function() {

    var res = doOperation(8.2,2, divide);
    assert.equal(res, 4.1);
  });
});

describe('divide 1 by 8', function() {
  it('should divide the 1 by 8 and equal .125', function() {

    var res = doOperation(1,8, divide);
    assert.equal(res, .125);
  });
});

describe('multiply', function() {
  it('multiply the 2 numbers', function() {

    var res =  doOperation(8.2,3, multiply);
    assert.equal(res, 24.6);
  });
});


describe('4+2', function() {
  it('perform the calculation', function() {

    var res = calculate("4+2");
    assert.equal(res, 6);
  });
});

describe('48+6/2+', function() {
  it('should perform the calculation correctly', function() {

    var res = calculate("48+6/2+");
    assert.equal(res, 27);
  });
});

describe('bad user input', function() {
  it('should not cause errors', function() {

    var res = calculate("+9+");
    assert.equal(res, 9);
  });
});

describe('double operatores not allowed', function() {
  it('should return last operator is repeated operator entered', function() {

    var res = removeRepeatOperators("4+", "+" );
    assert.equal(res, "4+");
  });
});

describe('double operatores not allowed', function() {
  it('should return last operator if a different operator is entered', function() {

    var res = removeRepeatOperators("4+", "-" );
    assert.equal(res, "4-");
  });
});

describe('last entry removed - numbers', function() {
  it('should remove the numbers from the end of input', function() {

    var res = stripLastEntry("34+67");
    assert.equal(res, "34+");
  });
});

describe('last entry removed - operators', function() {
  it('should remove the operators from the end of input', function() {

    var res = stripLastEntry("4+3-5++/");
    assert.equal(res, "4+3-5");
  });
});

stripLastEntry