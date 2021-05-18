const assert = require('assert');

const { returnsThree, recipricol } = require('../problems/number-fun');

describe('returnsThree()', () => {
	it('should return the number 3', () => {
		let expected = 3;

		let result = returnsThree();

		assert.equal(result, expected);
	});
});

describe('recipricol(num)', () => {
	context('with a valid input (1 - 1000000)', () => {
		it('should return the recipricol of the input number', () => {
			assert.equal(recipricol(10), 0.1);
			assert.equal(recipricol(2), 0.5);
			assert.equal(recipricol(1), 1);
		});
	});
	context('with invalid input', () => {
		it('should throw a TypeError', () => {
			assert.throws(() => recipricol(-2), TypeError('Input must be between 1 and 1000000'));
			assert.throws(() => recipricol(2000000), TypeError('Input must be between 1 and 1000000'));
		});
	});
});
