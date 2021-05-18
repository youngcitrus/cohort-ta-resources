const Book = require('./book');
const Movie = require('./movie');
const Owner = require('./owner');

class Person extends Owner {
	constructor(name, age, books, movies) {
		super(name, books, movies);
		this.age = age;
	}

	displayBooks() {
		console.log(`\n${this.name} currently has the following books in their possession:`);
		this.books.forEach((book) => {
			let info = book.infoToDisplay();
			if (book.owner !== this) {
				info += ` (borrowed from ${book.getOwnerInformation()})`;
			}
			console.log(info);
		});
	}

	displayMovies() {
		console.log(`\n${this.name} currently has the following movies in their possession:`);
		this.movies.forEach((movie) => {
			let info = movie.infoToDisplay();
			if (movie.owner !== this) {
				info += ` (borrowed from ${movie.getOwnerInformation()})`;
			}
			console.log(info);
		});
	}

	returnAllItems() {
		let collection = [ ...this.books, ...this.movies ];
		collection.forEach((item) => {
			if (item.owner !== this) {
				this.lendItem(item, item.owner);
				console.log(`\n${this.name} returned ${item.title} to ${item.getOwnerInformation()}`);
			}
		});
	}
}

module.exports = Person;
