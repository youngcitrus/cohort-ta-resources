// Creating your own version of Array methods
// We want to iterate over each element, then perform some action with it
// For myEvery, if the callback is not true for the element, we want to return false for the overall myEvery function
// If we checked every element and they were all true, return true overall
function myEvery(array, cb) {
	for (let i = 0; i < array.length; i++) {
		if (!cb(array[i])) {
			return false;
		}
	}
	return true;
}

const myMixedArray = [ 1, 4, 5, 6 ];
const myEvenArray = [ 2, 4, 10 ];

function isEven(num) {
	return num % 2 === 0;
}

console.log(myEvery(myMixedArray, isEven)); // false
console.log(myEvery(myEvenArray, isEven)); // true
