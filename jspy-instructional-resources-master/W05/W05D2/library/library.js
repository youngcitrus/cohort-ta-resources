const Book = require('./book');
const Movie = require('./movie');
const Owner = require('./owner');

class Library extends Owner {
	constructor(name, address, books, movies) {
		super(name, books, movies);
		this.address = address;
	}

	displayBooks() {
		console.log(`\nThe following books are in the collection at ${this.name}, located at ${this.address}:`);
		this.books.forEach((book) => console.log(book.infoToDisplay()));
	}

	displayMovies() {
		console.log(`\nThe following movies are in the collection at ${this.name}, located at ${this.address}:`);
		this.movies.forEach((movie) => console.log(movie.infoToDisplay()));
	}
}

module.exports = Library;
