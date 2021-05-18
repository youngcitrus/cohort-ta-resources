const { assert } = require('chai');
const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

const reverseString = require('../problems/reverse-string');

describe('reverseString(input)', () => {
	context('with a string input', () => {
		it('should reverse a string', () => {
			let input = 'fun';
			let expected = 'nuf';

			let result = reverseString(input);

			expect(result).to.equal(expected);
		});
	});
	context('with invalid input', () => {
		it('should throw a TypeError', () => {
			let input = 4;

			expect(() => reverseString(input)).to.throw(TypeError, 'Input must be of type string');
			// assert.throws(() => reverseString(input), TypeError, 'Input must be of type string');
		});
	});
});
