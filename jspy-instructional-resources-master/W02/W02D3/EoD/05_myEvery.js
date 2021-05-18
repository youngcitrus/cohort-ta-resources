// Write a function, myEvery, that takes in an array and a callback as arguments.
// The function should mimic the behavior of Array#every.

function myEvery(arr, cb) {
	// iterate through the array, perform the cb on each element
	// if the callback returns false, return false from the function
	// if we made it through every element, return true overall

	for (let i = 0; i < arr.length; i++) {
		let val = arr[i];
		if (!cb(val)) {
			return false;
		}
	}

	return true;
}

let multipleOfThree = function(num) {
	return num % 3 === 0;
};

console.log(myEvery([ 1, 2, 3, 10, 33, 48, 50 ], multipleOfThree)); // false
console.log(myEvery([ 3, 33, 48 ], multipleOfThree)); // true
