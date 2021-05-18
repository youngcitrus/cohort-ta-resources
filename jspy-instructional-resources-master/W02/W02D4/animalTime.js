// context: global
const animalTime = {
	name: 'Patrick',
	sayBark: function() {
		// context: animalTime
		return function() {
			let str = this.name + ' says Bark!';
			return str;
		};
	},
	// context: global
	sayMoo: () => {
		// context: global
		return function() {
			// context: global
			let str = this.name + ' says Moo!';
			return str;
		};
	}
};

let animalSound1 = (function() {
	let str = this.name + ' says Bark!';
	return str;
})(); // method style
let animalSound2 = animalTime.sayMoo();

console.log(animalSound1()); // 'Patrick says Bark!'
console.log(animalSound2()); // 'undefined says Moo!'
