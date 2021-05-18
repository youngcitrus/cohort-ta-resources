const chai = require('chai');
const expect = chai.expect;

const Dog = require('../problems/dog');

describe('Dog', function() {
	let layla;

	beforeEach('set up a dog instance', function() {
		layla = new Dog('Layla');
	});

	describe('Dog Constructor Function', function() {
		it('should have a "name" property', function() {
			expect(layla).to.have.property('name');
		});

		it('should set the "name" property when a new dog is created', function() {
			expect(layla.name).to.eql('Layla');
		});
	});

	describe('prototype.bark()', function() {
		it('should return a string with the name of the dog barking', function() {
			expect(layla.bark()).to.eql('Layla is barking');
		});
	});
});
