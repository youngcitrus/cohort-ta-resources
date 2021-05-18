class Owner {
	constructor(name, books, movies) {
		this.name = name;
		this.books = books || [];
		this.movies = movies || [];
	}

	addToCollection(item) {
		if (item instanceof require('./book')) {
			this.books.push(item);
		} else if (item instanceof require('./movie')) {
			this.movies.push(item);
		}
	}

	findItems(title) {
		let collection = this.books.concat(...this.movies);
		let found = [];
		for (let i = 0; i < collection.length; i++) {
			let item = collection[i];
			if (item.title.includes(title)) {
				found.push(item);
			}
		}
		return found;
	}

	removeFromCollection(item) {
		if (item instanceof require('./book')) {
			let index = this.books.indexOf(item);
			this.books.splice(index, 1);
		} else if (item instanceof require('./movie')) {
			let index = this.movies.indexOf(item);
			this.movies.splice(index, 1);
		}
	}

	lendItem(item, borrower) {
		// console.log(`\n${borrower.name} is borrowing ${item.title} from ${this.name}`);
		this.removeFromCollection(item);
		borrower.addToCollection(item);
	}
}

module.exports = Owner;
