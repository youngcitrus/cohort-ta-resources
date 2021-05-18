const CatalogItem = require('./catalog-item');

class Movie extends CatalogItem {
	constructor(title, series, year, owner, rating, runtime) {
		super(title, series, year, owner);
		this.rating = rating;
		this.runtime = runtime;
	}

	infoToDisplay() {
		let result = super.infoToDisplay();
		return result + `, Rated: ${this.rating} (${this.runtime} minutes)`;
	}
}

module.exports = Movie;
