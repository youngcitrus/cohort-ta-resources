## JavaScript Trivia (W3D5) - Learning Objectives

### JavaScript Trivia, aka Important JavaScript Things Not in One Nice Category
1. Given a code snippet of an unassigned variable, predict its value.
- This gets into both the ideas of default values and hoisting.
- Since `const` variables cannot be reassigned, JavaScript does not assign it a default value. If we declare a `const` variable without assigning a value and then try to use it later on, we'll get a SyntaxError:
```js
const goodbye;
console.log(goodbye); // SyntaxError: Missing initializer in const declaration
```
- Since `let` and `var` variables can be reassigned, JavaScript gives them a default value of `undefined` if they aren't initialized with a value.
```js
var hello;
let goodbye;
console.log(hello); // prints undefined
console.log(goodbye); // prints undefined
```
- Where a variable is defined within our code can also affect what its value is.
  - A variable declared with `var` has its declaration hoisted, meaning we can reference the variable, but its value will be `undefined`, even if we initialized it to a value (that assignment doesn't happen until that line of code is run).
  - A variable declared with `let` or `const` will have its name hoisted, but its declaration is not. JavaScript will do this so that it can throw a more meaningful error for us if we try to access the variable:
```js
function hoistBuddy() {
  console.log(hello); // prints undefined
  var hello = "hello";

  console.log(goodbye); // ReferenceError: Cannot access 'goodbye' before initialization
  let goodbye = "goodbye";

  console.log(seeYa); // ReferenceError: Cannot access 'seeYa' before initialization
  const seeYa = "see ya!";
}

hoistBuddy();
```
- We can see that JavaScript knows that we have `goodbye` and `seeYa` variables declared later on, so it tells us a meaningful error (we cannot access the variable before it's initialized). This should be a good clue to us, the developer, that we are using a `let` or `const` variable before the line that we declared it.


2. Explain why functions are “First Class Objects” in JavaScript
- There are three main factors that make a function a "First Class Object":
  - They can be assigned to a variable.
  - They can be returned from a function.
  - They can be passed as an argument to a function.
- Essentially, functions can be treated like any other variable in JavaScript.

3. Define what IIFEs are and explain their use case
- An IIFE is an Immediately Invoked Function Expression.
- IIFEs are one way to prevent the pollution of the global namespace by creating functions and variables that will disappear after the IIFE has been invoked.
- This means that the function is only usable the one time (the location that it is defined and invoked) before it is cleaned up by JavaScript's garbage collection.
- After an IIFE, we will not be able to access the function again - it will no longer exist.
```js
const result = (function() {
  return "food";
})();

console.log(result); // "food"
// We have access to the string "food" because it was returned from the function, but we do not have the function itself in memory anywhere. It was defined and invoked, then cleared from memory since we did not define a variable to hold on to a reference to it.

// Contrast this to the code below, which holds a reference to the function.
// This function is held in memory (assigned to notAnIIFE), and can thus be invoked multiple times.
const notAnIIFE = function () {
  return "food";
}

const result1 = notAnIIFE();
const result2 = notAnIIFE();
console.log(result1); // "food"
console.log(result2); // "food"
```

4. (Whiteboarding) Implement a closure
- A closure is present in a function that returns another function, allowing the inner function to maintain a reference to variables or arguments from the outer scope.
```js
function dynamicDivider(divisor) {
  // here we are returning an inner function that will create a closure by
  // closing over and accessing the above divisor argument to use within the
  // function returned below

  return function(num) {
    return num / divisor;
  };
}
```
```js
// We close over the variable sandwich, allowing our inner function to manipulate this variable.
function sandwichMaker() {
  let sandwich = "A sandwich with bread";
  return function (item) {
    sandwich += ` and ${item}`;
    return sandwich;
  }
}

const mySandwich = sandwichMaker();
console.log(mySandwich("peanut butter")); // A sandwich with bread and peanut butter

const yourSandwich = sandwichMaker();
yourSandwich("turkey");
yourSandwich("mustard");
console.log(yourSandwich("lettuce")); // A sandwich with bread and turkey and mustard and lettuce

console.log(mySandwich("jelly")); // A sandwich with bread and peanut butter and jelly
```

5. Identify JavaScript’s falsey values
- There are six values in JavaScript that are always considered falsy:
  - false
  - 0
  - '' or "" (empty string)
  - null
  - undefined
  - NaN (Not a Number)
- If we are using conditions (if blocks, while loops, etc.) and our condition evaluates to any of these values, it will be considered false.
- ANY other value is thus considered truthy.
  - Numbers other than 0
  - Any non-empty string
    - '0' (even a string containing a single zero)
    - 'false' (even a string containing the text “false”)
  - Any array
    - [] (even an empty array)
  - Any object in general
    - {} (even an empty object)
  - Any function
    - function(){} (even an “empty” function)
  - etc. (literally anything not in that first list)

6. Interpolate a string using back-ticks
- Instead of concatenating strings together with `+` we can interpolate values directly within the string. 
- We use the backtick ` to open and close a string that we will be interpolating inside of.
- When we get to a point that we want to evaluate some JavaScript inside of the string (use the value of a variable, for example) we use `${expresssion}` to evaluate the expression:
```js
const name = "Bryce";
console.log(`Hello, ${name}! Good to see you!`); // Hello, Bryce! Good to see you! (we evaluated the variable `name` to be "Bryce" before adding it into our string)
console.log(`1 + 1 = ${1+1}`); // 1 + 1 = 2 (we evaluated 1 + 1 before adding it into our string)
```

7. Identify that object keys are strings or symbols
- Up until recent versions of JavaScript, keys in objects were always strings. With the ES6 version of JavaScript, keys can also be symbols.
- A symbol is always unique. Using a symbol as a key will ensure that there will never be a name collision, so values will never accidentally be overwritten. This also means that we need to keep a reference to that symbol when it is created, though, since creating a new one will not reference the same value. This may not always be feasible, so you will see strings as keys very often, but knowing that symbols are possible keys is important.
- Using strings to cause a name collision:
```js
const dog = {};
// I set an 'id' key value pair on my dog
dog["id"] = 39;

// Here imagine someone else comes into my code base and
// accidentally adds another key with the same name!
dog.id = 42;

console.log(dog); //  { id: 42 }
```
- Using symbols to prevent the collision:
```js
const dog = {};
const dogId = Symbol("id");
dog[dogId] = 39;

const secondDogId = Symbol("id");
dog[secondDogId] = 42;

console.log(dog[dogId]); //  39
console.log(dog); //  { [Symbol(id)]: 39, [Symbol(id)]: 42 }
// This means that we have to keep track of the dogId and secondDogId variables, though, since creating another symbol (even with the same description) results in a new value and will not match a key in the object
console.log(dog[Symbol("id")]); // undefined
```

8. A primitive type is data that is not an object and therefore cannot have methods(functions that belong to them).
- There are many primitive types:
  - `Boolean` - true and false
  - `Null` - represents the intentional absence of value.
  - `Undefined` - default return value for many things in JavaScript.
  - `Number` - like the numbers we usually use (15, 4, 42)
  - `String` - ordered collection of characters ('apple')
  - `Symbol` - new to ES5 a symbol is a unique primitive value
  - `BigInt` - a data type that can represent larger integers than the Number type can safely handle.
- But only one reference type:
  - `Object` - a collection of properties and methods. This includes an Array, which is a type of Object!
- In addition to the distinction of primitive types being immutable and reference types being mutable, a reference type is also the ONLY type that has methods.
- This may seem odd at first. What about when we call `"hello".toUpperCase()`, for example? What's actually happening is JavaScript is wrapping the `"hello"` string in an String Object wrapper, invoking the `.toUpperCase()` method that exists on that object, and returning the result. This is why calling `.toUpperCase()` on a string, even if it's saved to a variable, does not mutate the string, it just returns a new uppercase version.

9. Given a code snippet where variable and function hoisting occurs, identify the return value of a function.
- When a function is defined using function declaration (`function myFunc() {...}`), its declaration is hoisted to the top of the file. This means that we can invoke this function higher up in the file than wherever it is written.
```js
sayHello(); // Hello! (no error, the declaration was hoisted)

function sayHello() {
  console.log("Hello!");
}
```
- When a function is defined using a function expression (`let myLetFunc = function() {...}`, `const myConstFunc = function(){...}`, `var myVarFunc = function(){...}`), the same hoisting rules apply for assigning a variable with those keywords.
  - A `let` or `const` will hoist the name, but not the value of a variable, so if we try to invoke a function defined with `let` or `const`, we will get a ReferenceError indicating that we cannot access the variable before it's initialized.
  - A `var` will hoist the name and have a value of `undefined` before the line that initializes it. This means that when we try to invoke the function, we'll be trying to call a method on `undefined`. This results in a TypeError indicating that the variable is not a function.
```js
helloWithLet(); // ReferenceError: Cannot access 'helloWithLet' before initialization
helloWithConst(); // ReferenceError: Cannot access 'helloWithConst' before initialization
helloWithVar(); // TypeError: helloWithVar is not a function

let helloWithLet = function() {
  console.log("Hey!");
}

const helloWithConst = function() {
  console.log("Hi!");
}

var helloWithVar = function() {
  console.log("Hello!");
}
```
