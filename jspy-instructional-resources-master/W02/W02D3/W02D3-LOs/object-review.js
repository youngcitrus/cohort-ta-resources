// Objects:
// dot notation vs bracket notation
// Iterating over an object, accessing each key and value
// getting nested information
// using `=` to assign/reassign key/value pairs

let myObj = { alpha: 1, beta: 2, hello: 'world' };
alpha = 'banana';

// console.log(myObj);
// console.log(myObj.alpha);
// console.log(myObj[alpha]);

let myComplexObj = { alpha: 1, beta: [ 1, 2, 'hello', { fruit: 'apple' } ], world: 42 };
let myKey = 'fruit';

// console.log(myComplexObj.beta);
// console.log(myComplexObj.beta[3]);
// console.log(myComplexObj.beta[3].fruit);
// console.log(myComplexObj.beta[3][myKey]);
console.log(myComplexObj.fruit);

// console.log(myComplexObj.alpha);
// myComplexObj.alpha = 'banana';
// console.log(myComplexObj.alpha);

// console.log(myComplexObj.gamma);
// myComplexObj.gamma = 'orange';
// console.log(myComplexObj.gamma);
