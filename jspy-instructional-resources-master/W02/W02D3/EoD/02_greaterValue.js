// Write a function that takes in a value and two callbacks.
// The function should return the result of the callback that is greater.

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
