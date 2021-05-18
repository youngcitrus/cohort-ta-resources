const CatalogItem = require('./catalog-item');

class Book extends CatalogItem {
	constructor(title, series, year, owner, author, numPages) {
		super(title, series, year, owner);
		this.author = author;
		this.numPages = numPages;
	}

	infoToDisplay() {
		let result = super.infoToDisplay();
		return result + `, Written by: ${this.author} (${this.numPages} pages)`;
	}
}

module.exports = Book;
