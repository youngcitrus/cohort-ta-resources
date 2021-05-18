## Callback Functions (W2D3) - Learning Objectives

### Callbacks
1. Given multiple plausible reasons, identify why functions are called “First Class Objects” in JavaScript.
- First class objects should support three main operations
  1. They can be assigned to variables
  2. They can be passed as an argument
  3. They can be returned from a function
- All of these apply to functions. We can pass them around in variables, use them as arguments (a callback), and return them from other functions.

2. Given a code snippet containing an anonymous callback, a named callback, and multiple `console.log`s, predict what will be printed
```js
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
// 13, 14
```

3. Write a function that takes in a value and two callbacks. The function should return the result of the callback that is greater.
```js
function greaterValue(value, cb1, cb2) {
	// compare cb1 invoked with value to cb2 invoked with value
	// return the greater result

	let res1 = cb1(value);
	let res2 = cb2(value);
	if (res1 > res2) {
		// if this is false, we move out of if statement
		return res1;
	}
	return res2;
}

let negate = function(num) {
	return num * -1;
};

let addOne = function(num) {
	return num + 1;
};

// we don't use () because we don't want to invoke negate or addOne immediately, we are doing so inside of greaterValue
console.log(greaterValue(3, negate, addOne)); // 4
console.log(greaterValue(-2, negate, addOne)); // 2
```

4. Write a function, myMap, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#map`.
```js
function myMap(arr, cb) {
	// iterate through the array, perform the cb on each element
	// return a new array with those new values

	let mapped = [];

	for (let i = 0; i < arr.length; i++) {
		let val = cb(arr[i], i, arr);
		mapped.push(val);
	}

	return mapped;
}

let double = function(num) {
	return num * 2;
};

console.log(myMap([ 1, 2, 3 ], double)); // [2,4,6]
```

5. Write a function, myFilter, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#filter`.
```js
function myFilter(arr, cb) {
	// iterate through the array, perform the cb on each element
	// if the callback returns true, add it to our filtered array

	let filtered = [];

	for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
		if(cb(val)){
      filtered.push(val);
    }
	}

	return filtered;
}

let multipleOfThree = function(num) {
	return (num % 3 === 0);
};

console.log(myFilter([ 1, 2, 3, 10, 33, 48, 50 ], multipleOfThree)); // [ 3, 33, 48 ]
```

6. Write a function, myEvery, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#every`.
```js
function myEvery(arr, cb) {
	// iterate through the array, perform the cb on each element
	// if the callback returns false, return false from the function
  // if we made it through every element, return true overall

	for (let i = 0; i < arr.length; i++) {
    let val = arr[i];
		if(!cb(val)){
      return false;
    }
	}

	return true;
}

let multipleOfThree = function(num) {
	return (num % 3 === 0);
};

console.log(myEvery([ 1, 2, 3, 10, 33, 48, 50 ], multipleOfThree)); // false
console.log(myEvery([ 3, 33, 48 ], multipleOfThree)); // true
```
