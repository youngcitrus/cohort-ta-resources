// Arrow functions, method vs function invocation
const animalTime = {
	name: 'Patrick',
	sayMoo: () => {
		console.log(this); // global
		let str = this.name + ' says Moo!';
		return str;
	},
	sayBark: function() {
		// context: animalTime
		return () => {
			// context: animalTime
			let str = this.name + ' says Bark!';
			return str;
		};
	},
	sayChirp: () => {
		return function() {
			// context: global
			let str = this.name + ' says Chirp!';
			return str;
		};
	}
};

let animalSound = animalTime.sayChirp();
console.log(animalSound()); // ???
// animalSound is invoked function style, so we check to see how it was defined (arrow or function keyword)
// The function that it refers to starts on line 14, defined with the function keyword
// The function keyword does not maintain context, so we know that the context is the global object

let animalBark = animalTime.sayBark();
console.log(animalBark()); // ???
// animalBark is invoked function style, so we check to see how it was defined (arrow or function keyword)
// The function that it refers to starts on line 8, defined with an arrow syntax
// The arrow syntax maintains context, so we need to figure out what the context was at this point
// Tracing backwards, animalBark was created from animalTime.sayBark()
// Checking sayBark, we see that it is written with the function keyword, so context is not maintained/can be changed by a method invocation or bind
// sayBark was invoked method style, so the context is set to be the animalTime object
// We now know that the context that the arrow function from animalBark maintained is the animalTime object
// this.name will refer to 'Patrick' in this case
