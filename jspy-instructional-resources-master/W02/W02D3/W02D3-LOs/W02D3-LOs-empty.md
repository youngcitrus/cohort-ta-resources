## Callback Functions (W2D3) - Learning Objectives

### Callbacks
1. Given multiple plausible reasons, identify why functions are called “First Class Objects” in JavaScript.
2. Given a code snippet containing an anonymous callback, a named callback, and multiple `console.log`s, predict what will be printed
```js
// Example
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

// Where are we using callbacks?
```
3. Write a function that takes in a value and two callbacks. The function should return the result of the callback that is greater.
4. Write a function, myMap, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#map`.
5. Write a function, myFilter, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#filter`.
6. Write a function, myEvery, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#every`.
