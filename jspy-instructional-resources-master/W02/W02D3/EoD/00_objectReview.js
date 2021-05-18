// Objects:
// dot notation vs bracket notation
// Iterating over an object, accessing each key and value
// getting nested information
// using `=` to assign/reassign key/value pairs

// Setting up an object and string variable
let myObj = { alpha: 1, beta: 2, hello: 'world' };
let alpha = 'hello';

console.log(myObj); // logs our whole object
console.log(myObj.alpha); // logs 1 (we are looking for the key 'alpha' specifically)
console.log(myObj[alpha]); // logs 'world' (we are evaluating what's inside the brackets, then finding that key)

// Iterate over an object, accessing each key and value
for (let key in myObj) {
	console.log('My key is ' + key + ' and my value is ' + myObj[key]);
}

// setting up a more complex object
let myComplexObj = { alpha: 1, beta: [ 'a', 'b', 3, { hello: 'world' } ] };

// get the element at the 'beta' key -> myComplexObj.beta returns the array [ 'a', 'b', 3, { hello: 'world' } ]
// get the element at index 3 -> myComplexObj.beta[3] returns the object { hello: 'world' }
// get the element at the 'hello' key -> myComplexObj.beta[3].hello returns the value 'world'
console.log(myComplexObj.beta[3]['hello']); // evaluate the string 'hello'
console.log(myComplexObj.beta[3][alpha]); // evaluate the variable alpha
console.log(myComplexObj.beta[3].hello); // look directly for 'hello'

// Change the value that the 'alpha' key points to
console.log(myComplexObj.alpha);
myComplexObj.alpha = 100;
console.log(myComplexObj.alpha);

// Create a new key called 'name' that points to 'Bryce'
console.log(myComplexObj.name); // 'name' key does not exist, logs `undefined`
myComplexObj.name = 'Bryce';
console.log(myComplexObj.name); // We created the key and can now log its value
