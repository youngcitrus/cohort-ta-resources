// Iterating over an object
const myObj = { alpha: 1, beta: 2, hello: 'world' };

// Object.keys returns an array of all of the keys, which we can loop over
const myKeys = Object.keys(myObj);
// console.log(myKeys);
// // We can use a forEach, a for loop, while, ... any way that we interact with an array
// myKeys.forEach((key) => {
// 	console.log('Key: ' + key + ', Value: ' + myObj[key]);
// });

// "for in" loops allow us to iterate over each key as well, providing similar functionality
for (let key in myObj) {
	console.log('Key: ' + key + ', Value: ' + myObj[key]);
}
