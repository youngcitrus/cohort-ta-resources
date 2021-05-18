class CatalogItem {
	constructor(title, series, year, owner) {
		this.title = title;
		this.series = series;
		this.year = year;
		this.owner = owner;
		if (owner) {
			owner.addToCollection(this);
		}
	}

	changeOwnership(newOwner) {
		this.owner = newOwner;
		newOwner.addToCollection(this);
	}

	infoToDisplay() {
		let message = `${this.title}, `;
		if (this.series) {
			message += `${this.series}, `;
		}
		message += `Released: ${this.year}`;
		return message;
	}

	getOwnerInformation() {
		return this.owner.name;
	}
}

module.exports = CatalogItem;
