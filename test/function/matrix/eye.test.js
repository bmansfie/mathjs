var assert = require('assert'),
    math = require('../../../index'),
    matrix = math.matrix,
    eye = math.eye;

describe('eye', function() {

  it('should create an empty matrix', function () {
    assert.deepEqual(eye(), matrix());
    assert.deepEqual(eye([]), []);
    assert.deepEqual(eye(matrix([])), matrix());
  });

  it('should create an empty matrix with ccs storage type', function () {
    assert.deepEqual(eye('ccs'), matrix('ccs'));
    assert.deepEqual(eye(matrix([], 'ccs')), matrix('ccs'));
  });

  it('should create an identity matrix of the given size', function() {
    assert.deepEqual(eye(1), matrix([[1]]));
    assert.deepEqual(eye(2), matrix([[1,0],[0,1]]));
    assert.deepEqual(eye([2]), [[1,0],[0,1]]);
    assert.deepEqual(eye(2,3), matrix([[1,0,0],[0,1,0]]));
    assert.deepEqual(eye(3,2), matrix([[1,0],[0,1],[0,0]]));
    assert.deepEqual(eye([3,2]), [[1,0],[0,1],[0,0]]);
    assert.deepEqual(eye(math.matrix([3,2])), matrix([[1,0],[0,1],[0,0]]));
    assert.deepEqual(eye(3,3), matrix([[1,0,0],[0,1,0],[0,0,1]]));
  });

  it('should create an identity matrix with storage type css of the given size', function() {
    assert.deepEqual(eye(1, 'ccs'), matrix([[1]], 'ccs'));
    assert.deepEqual(eye(2, 'ccs'), matrix([[1,0],[0,1]], 'ccs'));
    assert.deepEqual(eye(2,3, 'ccs'), matrix([[1,0,0],[0,1,0]], 'ccs'));
    assert.deepEqual(eye(3,2, 'ccs'), matrix([[1,0],[0,1],[0,0]], 'ccs'));
    assert.deepEqual(eye(3,3, 'ccs'), matrix([[1,0,0],[0,1,0],[0,0,1]], 'ccs'));
  });

  it('should create an identity matrix with bignumbers', function() {
    var zero = math.bignumber(0);
    var one = math.bignumber(1);
    var two = math.bignumber(2);
    var three = math.bignumber(3);
    assert.deepEqual(eye(two), matrix([[one,zero],[zero,one]]));
    //assert.deepEqual(eye(two, 'ccs'), matrix([[one,zero],[zero,one]], 'ccs')); // FIXME: eye css
    assert.deepEqual(eye(two, three), matrix([[one,zero,zero],[zero,one,zero]]));
    //assert.deepEqual(eye(two, three, 'ccs'), matrix([[one,zero,zero],[zero,one,zero]], 'ccs')); // FIXME: eye css
  });

  it('should return an array when setting matrix=="array"', function() {
    var math2 = math.create({matrix: 'array'});
    assert.deepEqual(math2.eye(2), [[1,0],[0,1]]);
  });

  it('should throw an error with an invalid input', function() {
    assert.throws(function () {eye(3, 3, 2);});
    assert.throws(function () {eye([3, 3, 2]);});
    assert.throws(function () {eye([3, 3], 2);});
    assert.throws(function () {eye([3.2, 3]);});
    assert.throws(function () {eye([3, 3.2]);});
    assert.throws(function () {eye([3.2, 3.2]);});
    assert.throws(function () {eye([2, 'str']);});
    assert.throws(function () {eye(['str', 2]);});
    assert.throws(function () {eye([-2, 2]);});
    assert.throws(function () {eye([2, -2]);});
  });

});