# Intermediate JavaScript (Week 2) - Learning Objectives

## Assessment Structure
- 2 hours
- Mixture multiple choice (10-15), free response (1-2), coding in an online REPL (3-4), and coding problems completed in VSCode and uploaded (10-15).
  - Coding problems will have specs to run (`mocha`) and check your work against
- Standard assesment procedures
  - You will be in an individual breakout room
  - Use a single monitor and share your screen
  - Only have open those resources needed to complete the assessment:
    - Zoom
    - VSCode
    - Browser with AAO and Progress Tracker (to ask questions)
    - Approved Resources for this assessment:
      - MDN Docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript


## Running JS Locally (W2D1) - Learning Objectives

### Running JS Locally
1. Match the commands ls, cd, pwd to their descriptions
2. Given a folder structure diagram, a list of 'cd (path)' commands and target files, match the paths to the target files.
3. Use VSCode to create a folder. Within the folder create a .js file containing `console.log('hello new world');` and save it.
4. Use node to execute a JavaScript file in the terminal


## POJOs and Pair Programming (W2D2) - Learning Objectives

### Plain Old JavaScript Objects
1. Label variables as either Primitive vs. Reference
2. Identify when to use . vs [] when accessing values of an object
3. Use the `obj[key] !== undefined` pattern to check if a given variable that contains a key exists in an object
4. Utilize `Object.keys` and `Object.values` in a function
5. Iterate through an object using a `for in` loop
6. Define a function that utilizes `...`rest syntax to accept an arbitrary number of arguments
7. Use `...`spread syntax for Object literals and Array literals
8. Destructure an array to reference specific elements
9. Destructure an object to reference specific values
10. Write a function that accepts a array as an argument and returns an object representing the count of each character in the array


## Callback Functions (W2D3) - Learning Objectives

### Callbacks
1. Given multiple plausible reasons, identify why functions are called “First Class Objects” in JavaScript.
2. Given a code snippet containing an anonymous callback, a named callback, and multiple `console.log`s, predict what will be printed
```js
// Example
function foo(cb) {
	console.log('grape');
	cb();
}

function bar() {
	console.log('banana');
}

const fruitBasket = function() {
	console.log('apple');
	bar();
	foo(bar);
	foo(function() {
		console.log('orange');
	});
	console.log('pear');
};

fruitBasket();

// What is going to be logged when we call fruitBasket?

// Where are we using callbacks?
```
3. Write a function that takes in a value and two callbacks. The function should return the result of the callback that is greater.
4. Write a function, myMap, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#map`.
5. Write a function, myFilter, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#filter`.
6. Write a function, myEvery, that takes in an array and a callback as arguments. The function should mimic the behavior of `Array#every`.


## Scope (W2D4) - Learning Objectives

### Scope
1. Identify the difference between const, let, and var declarations
2. Explain the difference between const, let, and var declarations
3. Predict the evaluation of code that utilizes function scope, block scope, lexical scope, and scope chaining
4. Define an arrow function
5. Given an arrow function, deduce the value of `this` without executing the code
6. Implement a closure and explain how the closure affects scope
7. Define a method that references `this` on an object literal
8. Utilize the built in `Function#bind` on a callback to maintain the context of `this`
9. Given a code snippet, identify what `this` refers to
