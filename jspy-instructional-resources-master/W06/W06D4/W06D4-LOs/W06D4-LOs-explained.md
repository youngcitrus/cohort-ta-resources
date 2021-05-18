## Testing in JavaScript (W6D4) - Learning Objectives

### Testing
1. Explain the "red-green-refactor" loop of test-driven development.
- Red: Write tests and watch them fail (protect against false positives)
- Green: Write the minimum amount of code to get the test to pass
- Refactor: Refactor the written code so that it is easy to maintain and understand

2. Identify the definitions of SyntaxError, ReferenceError, and TypeError
- SyntaxError
    - an error in how the code is written
    - encountered at compile-time, ie the code cannot be parsed to determine the instructions
    - since our code cannot be run, SyntaxErrors cannot be caught by a try-catch block
    - common examples would be:
        - a misspelled function keyword (`funtion broken() {...}`)
        - incorrect number of curly braces
- ReferenceError
    - when a nonexistent variable is referenced
    - most commonly seen when you mistype a variable name, or refer to one out of the current scope
    ```javascript
    const puppy = "puppy";
    console.log(pupy); // mistyped variable name
    ```

    ```javascript
    function callPuppy() {
        const puppy = "puppy";
    }
    console.log(puppy); // puppy is not in scope, it was created in the callPuppy function
    ```
- TypeError
    - when a variable or parameter is not of a valid type
    - can also be seen if we are trying to modify a value that cannot be changed (because a variable is declared with `const` instead of `let`, for example)
    ```javascript
    let dog; // Remember unassigned variables are undefined!
    dog(); // TypeError: dog is not a function

    const puppy = "puppy";
    puppy = "apple"; // TypeError: Assignment to constant variable.
    ```

3. Create, modify, and get to pass a suite of Mocha tests
- File Structure
    - Mocha will expect a `test` directory at the location that we are running our `mocha` command (typically the top level of our project)
    ```
    testing-demo
    └──
    problems
        └── reverse-string.js
    test
        └── reverse-string-spec.js
    ```
- Setting up `describe` and `it` blocks
    - We want to keep our tests organized just like our code.
    - A `describe` block gives a high level indication of what we are going to be testing, like the name of the function.
    - An `it` block tells us something that we are specifically testing. It defines an individual test that we are running.
    ```js
    describe ('reverseString()', function () {
        it('should reverse the input string', function () {
            // a test will go here!
        })
    }
    ```
- Using `assert` to test
    - Inside our `it` blocks we can use the `assert` module to execute a test.
    - There are many different functions we can use in this module.
    - A very common one is to use the `strictEqual` function, which compares two values. We can see other less common functions in the docs: https://nodejs.org/docs/latest-v12.x/api/assert.html# 
    ```js
    // remember we required the assert module and reverseString function at the top of this file
    describe("reverseString()", function() {
        it("should reverse the input string", function() {
            let test = reverseString("hello");
            let result = "olleh";
            // the line below is where the actual test is!
            assert.strictEqual(test, result);
        });
    });
    ```
    - Another common thing to test is that a function throws an error appropriately. We can use the `throws` function, which accepts a callback to invoke, the error we expect when that callback is invoked, and a message to show if the fail doesn't go through correctly.
        - It's important to note here that if we expect our function to throw an error, we cannot invoke it immediately, or else our test file itself will error out. We need to surround it in another function creating a callback to be invoked later. Our assertion is then able to compare the error to the second argument.
    ```js
    // note that we are passing function(){reverseString(3);} as an argument, not reverseString(3) directly
    context("given an argument that is not a string", function() {
        it("should throw a TypeError when given an argument that is not a string", function() {
            assert.throws(
            function() {
                reverseString(3);
            },
            TypeError,
            "this function only accepts string args"
            );
        });
    });
    ```

4. Use Chai to structure your tests using behavior-driven development principles.
- The Chai testing library provides additional functionality compared to using the basic `assert` module that comes with Node.
- Since it is external, we need to add it to our project with `npm install chai`
- After adding the library, we can require it just like the `assert` module with `const chai = require("chai");` at the top of our test files.
- Using `expect` from the `chai` library, we can chain "getters" together to construct tests that read like English. Since we use `expect` so much in our code, we generally separate it out at the top once instead of for each test: `const expect = chai.expect;`
```js
const chai = require("chai");
const expect = chai.expect;

// don't forget to import the class you are testing!
const Dog = require("../problems/dog.js");

describe("Dog Constructor Function", function() {
  it('should have a "name" property', function() {
    const layla = new Dog("Layla");
    expect(layla).to.have.property("name");
  });

  it('should set the "name" property when a new dog is created', function() {
    const layla = new Dog("Layla");
    // we are using the eql function to compare the value of layla.name
    // with the provided string
    expect(layla.name).to.eql("Layla");
  });
});
```
- This is a great cheatsheet for understanding what common chains are available to us: https://devhints.io/chai
- We can also reference the docs for a more detailed explanation: https://www.chaijs.com/api/bdd/

5. Use the pre- and post-test hooks provided by Mocha
- We learned about four hooks
    - before('description', callback): Callback is invoked before the block of test code is run
    - beforeEach('description', callback): Callback is invoked before each `it` statement in the block of test code
    - after('description', callback): Callback is invoked after the block of test code is run
    - afterEach('description', callback): Callback is invoked after each `it` statement in the block of test code
- before and beforeEach allows us to set up our test, pulling out common Arrange or Act portions of our tests
- after and afterEach are going to be less common for us, but allow us to do any kind of cleanup that may be necessary after a test has run
    - Looking forward, maybe we need to remove something from our database that our test created

6. Be familiar with `chai-spies` and its ability to test how many times a function is invoked
- After adding the `chai-spies` package to our project with `npm install chai-spies`, we can require it in our testing file. We are extending the functionality of the `chai` library, which has the `use` function to allow us to do so:
```js
const spies = require("chai-spies");
chai.use(spies);
```
- After this initial setup, we can spy on a particular function by creating a spy:
```js
// `on` takes in the object that we are spying on and the method we want to specifically watch
// Here we are saying to look at the layla object and track the calls to the chaseTail method
const chaseTailSpy = chai.spy.on(layla, "chaseTail");
```
- With our spy created, we can invoke whatever functions we would expect to call (or not call, if we are expecting 0 invocations) our method. We can then expect that our spy has been called any number of times:
```js
context("with a valid number parameter", function() {
  it("should call the chaseTail method n times", function() {
    const chaseTailSpy = chai.spy.on(layla, "chaseTail");
    layla.chainChaseTail(3);
    // below is our actual test to see how many times our spy was invoked
    expect(chaseTailSpy).to.have.been.called.exactly(3);
  });
});
```
```js
describe('myMap(array, callback)', () => {
	let inputArray;
	let callback = (el) => el + 1;
	beforeEach(() => {
		inputArray = [ 1, 2, 3 ];
	});
    // ...other tests
	it('should not call Array#map', () => {
        // The object we are spying on is the inputArray
        // We want to make sure we don't call `map` on it
            // We want our function do its own iteration and invocation
            // We are emulating Array#map instead of calling it directly
		const mapSpy = chai.spy.on(inputArray, 'map');
		myMap(inputArray, callback);

		expect(mapSpy).to.not.have.been.called();
	});
});
```
