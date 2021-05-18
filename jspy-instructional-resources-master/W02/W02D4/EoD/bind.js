// Binding a function to a new object
let cat = {
	name: 'Meowser',
	sayName: function() {
		console.log(this.name);
	}
};

let dog = {
	name: 'Fido'
};

let sayNameFunc = cat.sayName;

let sayHelloCat = sayNameFunc.bind(cat);
sayHelloCat(); // prints Meowser

let sayHelloDog = sayNameFunc.bind(dog);
sayHelloDog(); // prints Fido

//
//
//
//
// An example providing an argument at bind time
const sum = function(a, b) {
	return a + b;
};

// here we are creating a new function named add3
// this function will bind the value 3 for the first argument.
// We aren't using this inside the function, so we don't really care what the context is.
// We pass in null as the first argument (the context) so that we can give 3 as the first argument to sum by default.
const add3 = sum.bind(null, 3);

// now when we invoke our new add3 function it will add 3 to
// one incoming argument
console.log(add3(10));
