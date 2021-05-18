const fruitBasket = function(newFruits) {
	const alwaysAvailable = [ 'apples', 'bananas', 'oranges' ];
	const currentFruits = [ ...alwaysAvailable, ...newFruits ];
	console.log("Here's what's in my fruit basket:");
	// console.log(myFruits);
	// Available: Local, Global
	for (let i = 0; i < currentFruits.length; i++) {
		let message = 'Fruit #' + (i + 1) + ': ' + currentFruits[i];
		console.log(alwaysAvailable);
		console.log(myFruits);
		// Available: Local, Global, Block
		if (newFruits.includes(currentFruits[i])) {
			message += ' (Special today!)';
		}
		console.log(message);
	}
};

const myFruits = [ 'grapes', 'tangerines' ];

fruitBasket(myFruits);

//Available: Global

// Global: fruitBasket, myFruits
// Local / Function : alwaysAvailable, currentFruits
// Block : message
