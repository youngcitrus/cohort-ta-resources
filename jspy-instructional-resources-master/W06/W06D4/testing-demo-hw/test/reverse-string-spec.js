const assert = require('assert');

const reverseString = require('../problems/reverse-string');

describe('reverseString()', function() {
	context('given a string argument', function() {
		it('should reverse the given string', function() {
			let test = reverseString('hello');
			let result = 'olleh';

			assert.strictEqual(test, result);
		});

		it('should reverse the given string and output the same capitalization', function() {
			let test = reverseString('Apple');
			let result = 'elppA';
			assert.strictEqual(test, result);
		});
	});

	context('given an argument that is not a string', function() {
		it('should throw a TypeError when given an argument that is not a string', function() {
			assert.throws(
				function() {
					reverseString(3);
				},
				TypeError,
				'this function only accepts string args'
			);
		});
	});
});
