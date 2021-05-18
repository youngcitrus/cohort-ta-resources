// Write a function, myMap, that takes in an array and a callback as arguments.
// The function should mimic the behavior of Array#map.

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
