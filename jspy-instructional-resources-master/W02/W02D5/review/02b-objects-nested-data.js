const myComplexObj = { alpha: 1, beta: [ 1, 2, 'hello', { fruit: 'apple' } ], world: 42 };
const myKey = 'fruit';

console.log(myComplexObj.beta);
console.log(myComplexObj.beta[3]);
console.log(myComplexObj.beta[3].fruit);
console.log(myComplexObj.beta[3][myKey]);
console.log(myComplexObj.fruit);
