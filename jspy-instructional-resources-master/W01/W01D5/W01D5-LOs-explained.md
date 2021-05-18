## Data Types and Structured Exception Handling (W1D5) - Learning Objectives

### Data Types
1. Use the `typeof` operator to determine test types of values
- We occasionally need to determine what type of data we are actually working with.
- The `typeof` operator can be applied to whatever we are testing, with the result being a string that indicates the type.
- Most commonly, we'll see results of 'boolean', 'number', 'string', or 'function'. There are other possibilities as well, which we can see the full list of in the MDN docs: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof 
```js
let s = 'This is a string';
console.log(typeof s);    // 'string'

let n = 6.28;
console.log(typeof n);    // 'number'

let sum = function (a, b) {
  return a + b;
}
console.log(typeof sum);  // 'function'
```
- We can see that this can become useful when we want to make sure we are performing our actions on the correct input, handling any potential errors before they occur.
```js
if (typeof n === 'number') {
  // It is a number. Do some maths!
} else {
  console.log('I really wanted a number. :-(');
}
```

2. Use `Array.isArray` function to determine if an object is an array
- You may have noticed that 'array' is notably missing from that list of possible results from typeof.
- Because `typeof` cannot determine if something is an array, we have access to a function on the Array class itself, called `isArray`.
- `isArray` is called on Array itself, passing in what we are trying to test. `isArray` then returns a boolean to indicate whether the item tested is an array.
```js
let a = [1, 2, 3];
Array.isArray(a);  // true

let n = 6.28;
Array.isArray(n);  // false

let f = function () {}
Array.isArray(f);  // false
```

3. Explain the difference between `null` and `undefined`
- At first, `null` and `undefined` seem to be the same, but they have slightly different meanings/intentions.
- `null` is used to indicate an absence of value or an unknown value. We'll often see it used if we want to indicate that our function does not have an appropriate return value for the inputs. Anywhere that the result is 'none' or 'that question/calculation doesn't make sense', it may be appropriate to have `null` be the result.
- `undefined`, on the other hand, is generally a default. If we declare a variable without initializing a value, it will evaluate to `undefined`. If a function does not return anything specific, or doesn't even have a return statement, it will return `undefined`.

4. Use equality operators to determine if a value is `null` or `undefined`
- Both `null` and `undefined` are values that can be checked for with an equality operator.
```js
// Test if a value is null
if (value === null) {
  // do a thing
}

// Test if a value is undefined
if (value === undefined) {
  // do a thing
}
```

### Structured Exception Handling
1. Briefly explain what structured exception handling is.
- Structured Exception Handling is the process of creating code to intercept errors that may occur in our programs and respond to them in some way other than just crashing our application. The try-catch-finally blocks are a way to intercept these errors.

2. Use try-catch-finally blocks to catch errors.
- The try block surround the code that we want to be able to catch potential errors in. This is where we put anything that would have the potential to cause our program to crash, such as the wrong data type being passed in as an argument.
- The catch block runs if an error is thrown within the try block.  This block can be used to prompt for different input or gracefully explain what was expected vs. received and continue running code.
- The finally block is run no matter what, whether an error occurred or the try block completed successfully. Sometimes there are operations that we need to make sure happen, such as releasing access to a file that we opened. If an error occurred while we are in the middle of reading a file in our try block, we want to make sure we still close that file so that other programs may have access to it. Because of this, it makes sense to put it in our finally block so that it is always closed out.
```js
function printArray(array) {
  try{
    for (let i = 0; i < array.length; i++){
      console.log(i, array[i]);
    }
  } catch (e) {
    console.log('error: an error occurred:', e.message);
  } finally {
    console.log('I always run.');
  }
}
```

3. Create a custom error with the `throw` keyword.
- Not only can we catch standard errors that would occur in our code's evaluation, we can throw our own custom errors.
- If a function that we are writing should only be performed on numbers between 0 and 100, for example, the code that we write most likely won't result in an error if we pass in 101. We're probably doing some math or performing some action a certain number of times, so 101 won't break our code, we just don't want to allow it to happen. We can `throw` our own error to indicate the number is outside of our desired range.
```js
function performAction(input){
  if(input > 100 || input < 0){
    throw Error("OutOfBounds (must be between 0 and 100)");
  }
  // do something with input
  console.log(input)
}

try {
  performAction(10) // makes it to the console.log in performAction
  performAction(90) // makes it to the console.log in performAction
  performAction(101) // the custom error is thrown
  performAction(80) // code is never run because the error above was caught
} catch (e) {
  console.log('error: an error occurred:', e.message);
} finally {
  console.log('I always run.');
}
```
