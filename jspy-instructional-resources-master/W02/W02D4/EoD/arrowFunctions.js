const testObj = {
	name: 'The original object!',
	createFunc: function() {
		// context: testObj, invoked method style on testObj
		return function() {
			// context: global, invoked function style
			return this.name;
		};
	},

	createNestedArrowFunc: function() {
		// context: testObj, invoked method style on testObj
		return () => {
			// context: testObj, because the => preserves the context
			return this.name;
		};
	},

	// since the context of the testObj is global, the context of the arrow function will be global
	topLevelArrowFunc: () => {
		// context: global
		return this.name;
	}
};

const noArrow = testObj.createFunc();
const nestedArrowName = testObj.createNestedArrowFunc();
const topLevelArrowName = testObj.topLevelArrowFunc; // notice for consistency that we are not invoking this function because we want `topLevelArrowName` to be the function that we can invoke. We aren't creating a new function, just pulling out a reference.

console.log(noArrow()); // undefined
console.log(nestedArrowName()); // 'The original object!'
console.log(topLevelArrowName()); // undefined
