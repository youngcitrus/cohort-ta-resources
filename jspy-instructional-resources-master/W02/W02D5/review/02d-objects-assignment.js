// Assignment and Reassignment
const myComplexObj = { alpha: 1, beta: [ 1, 2, 'hello', { fruit: 'apple' } ], world: 42 };

// We can reassign a value for a key that already exists
console.log(myComplexObj.alpha);
myComplexObj.alpha = 'banana';
console.log(myComplexObj.alpha);

// We can use the same syntax to create a new key/value pair
console.log(myComplexObj.gamma);
myComplexObj.gamma = 'orange';
console.log(myComplexObj.gamma);
