// Destructuring
const myObj = { alpha: 1, beta: 2, hello: 'world' };

const { alpha, hello } = myObj;
console.log(alpha);
console.log(hello);

const { alpha: myAlpha, hello: myHello } = myObj;
console.log(myAlpha);
console.log(myHello);
// console.log(hello); // ReferenceError

// Complex destructuring
const myComplexObj = { alpha: 1, beta: [ 1, 2, 'hello', { fruit: 'apple' } ], world: 42 };

const { beta: [ firstBeta, secondBeta, thirdBeta, { fruit: myFruit } ] } = myComplexObj;
console.log(myFruit);
