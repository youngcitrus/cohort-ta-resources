const fruitBasket = function(newFruits) {
	const alwaysAvailable = [ 'apples', 'bananas', 'oranges' ];
	const currentFruits = [ ...alwaysAvailable, ...newFruits ];
	for (let i = 0; i < currentFruits.length; i++) {
		let message = 'Fruit #' + (i + 1) + ': ' + currentFruits[i];
		if (newFruits.includes(currentFruits[i])) {
			message += ' (Special today!)';
		}
		let myNewFruits = 'imposter';
		// console.log(message);
		console.log(myNewFruits);
		console.log(alwaysAvailable);
		console.log(message);
	}
	console.log('myNewFruits function level:', myNewFruits);
	// console.log(alwaysAvailable);
	// console.log(message);
};

const myNewFruits = [ 'grapes', 'tangerines' ];
// console.log(myNewFruits);
// console.log(alwaysAvailable);
// console.log(message);

fruitBasket(myNewFruits);

//Available: Global

// Global: fruitBasket, myFruits
// Local / Function : alwaysAvailable, currentFruits
// Block : message
