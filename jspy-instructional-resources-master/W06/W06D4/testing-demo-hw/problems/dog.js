// testing-demo/problems/dog.js

class Dog {
	constructor(name) {
		this.name = name;
	}

	bark() {
		return `${this.name} is barking`;
	}

	chainChaseTail(num) {
		if (typeof num !== 'number') {
			throw new TypeError('please only use numbers for this function');
		}
		for (let i = 0; i < num; i++) {
			this.chaseTail();
		}
	}

	chaseTail() {
		console.log(`${this.name} is chasing their tail`);
	}

	static cleanDogs(dogs) {
		let cleanDogs = [];
		dogs.forEach((dog) => {
			let dogStr = `I cleaned ${dog.name}'s paws.`;
			cleanDogs.push(dogStr);
		});
		return cleanDogs;
	}
}

// ensure to export our class!
module.exports = Dog;
