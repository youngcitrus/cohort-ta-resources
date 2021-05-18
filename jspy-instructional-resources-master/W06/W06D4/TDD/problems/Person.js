class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	sayHello() {
		return `${this.name} says "Hello!"`;
	}

	visit(otherPerson) {
		return `${this.name} visited ${otherPerson.name}`;
	}

	switchVisit(otherPerson) {
		return `${otherPerson.name} visited ${this.name}`;
	}

	update(obj) {
		if (typeof obj !== 'object') {
			throw TypeError('Argument must be an object');
		}
		if (!obj.name || !obj.age) {
			throw TypeError('Argument must have an age and name key');
		}
		this.name = obj.name;
		this.age = obj.age;
	}

	tryUpdate(obj) {
		try {
			this.update(obj);
			return true;
		} catch (err) {
			return false;
		}
	}

	static greetAll(people) {
		return people.map((person) => person.sayHello());
	}
}

module.exports = Person;
