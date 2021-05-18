// Write a function, myFilter, that takes in an array and a callback as arguments.
// The function should mimic the behavior of Array#filter.

function myFilter(arr, cb) {
	// iterate through the array, perform the cb on each element
	// if the callback returns true, add it to our filtered array

	let filtered = [];

	for (let i = 0; i < arr.length; i++) {
		let val = arr[i];
		if (cb(val)) {
			filtered.push(val);
		}
	}

	return filtered;
}

let multipleOfThree = function(num) {
	return num % 3 === 0;
};

console.log(myFilter([ 1, 2, 3, 10, 33, 48, 50 ], multipleOfThree)); // [ 3, 33, 48 ]
