function sandwichMaker() {
	let order = 'One sandwich with tomato';

	let addItem = function(food) {
		order += ' and ' + food;
		return order;
	};

	return addItem;
}

let sandwich = sandwichMaker();

console.log(sandwich);
console.log(sandwich('lettuce'));
console.log(sandwich('bacon'));
console.log(sandwich('mayo'));

// We are closing over a completely different instance of `order`
// This lets us make a new sandwich without losing our reference to the first
let otherSandwich = sandwichMaker();

// Turkey is added to a new sandwich
console.log(otherSandwich('turkey'));

// Turkey wasn't added to our original sandwich, but we can still add new items
console.log(sandwich('pepper'));
