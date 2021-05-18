const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

const Person = require('../problems/Person');

describe('Person class', () => {
	let person;
	let name = 'Bryce';
	let age = 28;

	let otherPerson;
	let otherName = 'Ryon';
	let otherAge = 28;

	beforeEach(() => {
		person = new Person(name, age);
		otherPerson = new Person(otherName, otherAge);
	});

	describe('constructor()', () => {
		it('should return an instance of a Person', () => {
			expect(person).to.be.an.instanceOf(Person);
		});
		it('should set a name and age property from parameters', () => {
			expect(person.name).to.equal(name);
			expect(person.age).to.equal(age);
		});
	});

	describe('prototype.sayHello', () => {
		it("should return a greeting with the person's name", () => {
			const expected = 'Bryce says "Hello!"';
			const result = person.sayHello();
			expect(result).to.equal(expected);
		});
	});

	describe('prototype.vist(otherPerson)', () => {
		it('should return a string stating the instance visited the passed in person', () => {
			const expected = 'Bryce visited Ryon';
			const result = person.visit(otherPerson);
			expect(result).to.equal(expected);
		});
	});

	describe('prototype.switchVist(otherPerson)', () => {
		it('should return a string stating the passed in person visited the instance', () => {
			const expected = 'Ryon visited Bryce';
			const result = person.switchVisit(otherPerson);
			expect(result).to.equal(expected);
		});
	});

	describe('prototype.update(obj)', () => {
		context('with a valid object argument', () => {
			it('should update the name and age', () => {
				const newName = 'Aaron';
				const newAge = 30;
				person.update({ name: newName, age: newAge });
				expect(person.name).to.equal(newName);
				expect(person.age).to.equal(newAge);
			});
		});
		context('with an invalid object argument', () => {
			it('should throw a TypeError when argument is not an Object', () => {
				expect(() => person.update('Aaron')).to.throw(TypeError);
				expect(() => person.update(4)).to.throw(TypeError);
			});
			it('should throw a TypeError when argument does not have a name and age key', () => {
				expect(() => person.update({ age: 30 })).to.throw(TypeError);
				expect(() => person.update({ name: 'Bryce' })).to.throw(TypeError);
			});
		});
	});

	describe('prototype.tryUpdate(obj)', () => {
		context('when update is successful', () => {
			it('should return true', () => {
				let result = person.tryUpdate({ age: 29, name: 'Aaron' });
				expect(result).to.be.true;
			});
			it('should update the instance attributes', () => {
				person.tryUpdate({ age: 29, name: 'Aaron' });
				expect(person.age).to.equal(29);
				expect(person.name).to.equal('Aaron');
			});
		});
		context('when update is not successful', () => {
			it('should return false', () => {
				let result = person.tryUpdate({ notAge: 29, notName: 'Brian' });
				expect(result).to.be.false;
			});
		});
	});

	describe('greetAll(people)', () => {
		it('should greet all people and return an array of those greetings', () => {
			let expected = [ 'Bryce says "Hello!"', 'Ryon says "Hello!"' ];
			let result = Person.greetAll([ person, otherPerson ]);
			expect(result).to.deep.equal(expected);
		});
		it('should call sayHello for each person', () => {
			let sayHelloSpy = chai.spy.on(Person.prototype, 'sayHello');
			Person.greetAll([ person, otherPerson ]);
			expect(sayHelloSpy).to.have.been.called.twice;
		});
	});
});
