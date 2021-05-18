const chai = require('chai');
const expect = chai.expect;
const spies = require('chai-spies');
chai.use(spies);

const myMap = require('../problems/myMap');

describe('myMap(array, callback)', () => {
	let inputArray;
	let callback = (el) => el + 1;
	beforeEach(() => {
		inputArray = [ 1, 2, 3 ];
	});
	it('should return a new array', () => {
		expect(myMap(inputArray, callback)).to.be.an.instanceOf(Array);
	});
	it('should not modify the input array', () => {
		myMap(inputArray, callback);

		expect(inputArray).to.deep.equal([ 1, 2, 3 ]);
	});
	it('should not call Array#map', () => {
		const mapSpy = chai.spy.on(inputArray, 'map');
		myMap(inputArray, callback);

		expect(mapSpy).to.not.have.been.called();
	});
	it('should call the callback on each element', () => {
		const callbackSpy = chai.spy(callback);
		myMap(inputArray, callbackSpy);
		expect(callbackSpy).to.have.been.called.exactly(3);
	});
	it('should return an array with elements created by the callback', () => {
		let result = myMap(inputArray, callback);
		let expected = [ 2, 3, 4 ];
		expect(result).to.deep.equal(expected);
	});
});
