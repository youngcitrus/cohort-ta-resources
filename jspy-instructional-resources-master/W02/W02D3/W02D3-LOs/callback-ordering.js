// Given a code snippet containing an anonymous callback, a named callback, and
// multiple `console.log`s, predict what will be printed

function foo(cb) {
	console.log('grape');
	cb();
}

function bar() {
	console.log('banana');
}

const fruitBasket = function() {
	console.log('apple');
	bar();
	foo(bar);
	foo(function() {
		console.log('orange');
	});
	console.log('pear');
};

fruitBasket();

// What is going to be logged when we call fruitBasket?

// apple
// banana
// grape
// banana
// grape
// orange
// pear

// Where are we using callbacks?
