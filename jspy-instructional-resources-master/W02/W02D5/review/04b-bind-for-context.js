// Using bind to change context
let cat = {
	name: 'Meowser',
	sayName: function() {
		console.log(this.name);
	}
};

let dog = {
	name: 'Fido'
};

// let sayNameFunc = cat.sayName;

// let sayHelloCat = sayNameFunc.bind(cat); // bind is returning a new function
// sayHelloCat(); // prints Meowser
// cat.sayName();

// let sayHelloDog = sayNameFunc.bind(dog);
// sayHelloDog(); // prints Fido
// // dog.sayName(); // TypeError

// binding a function that wasn't defined in an object

function sayName() {
	console.log(this.name);
}

sayHelloCat = sayName.bind(cat);
sayHelloCat();

sayHelloDog = sayName.bind(dog);
sayHelloDog();
