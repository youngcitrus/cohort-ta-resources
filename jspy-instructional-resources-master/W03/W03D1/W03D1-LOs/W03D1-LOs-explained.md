## Asynchronous JavaScript (W3D1) - Learning Objectives

### Asynchronous JS
1. Identify JavaScript as a language that utilizes an event loop model
- The event loop model of JavaScript incorporates two major components: the call stack and the message queue.
- The call stack keeps track of the execution of function calls.
  - When a function calls another function, that new function is placed on the call stack. When this added function completes, it is popped off of the stack and we continue executing the original function that called it.
  - When our call stack is empty, we are able to process a new function that may be waiting for us in our message queue...
- The message queue tracks the handling of events. We utilize the message queue to be able to implement asynchronous code.
  - When a setTimeout's delay expires, for example, we track the event in our message queue.
  - When our call stack is empty (the previous thread of execution ran its course and we are free to execute the next function), the callback from that setTimeout is taken from our message queue and added to the call stack.
  - This waiting for not only the delay to be met but also the call stack to be empty is the reason for us referring to the time as a minimum. If our delay is met but we are still executing functions in our call stack, the callback is not added on until the stack is completely empty.
- The terms `stack` and `queue` are important.
  - A stack is a LIFO structure, meaning as we add new items to it, the newer items are the first to be taken off. It can be thought of like a stack of plates. As we add new functions to the call stack, those newer functions (functions that are invoked by other functions) are executed first before continuing with the execution of the older functions.
  - A queue is a FIFO structure, meaning as we add new items to it, the oldest items are the first to be taken out. It can be though of like waiting in line (or in a queue :) ). As new events are triggered, they are added to the end of our message queue. When our call stack empties, JavaScript evaluates the next function in the queue, ie the one that corresponds to the first event that occurred.

2. Identify JavaScript as a single threaded language
- JavaScript is single-threaded, meaning one command is executed at a time. If a command is currently being executed, a new command that we want to execute will have to wait until the current one has completed.
- We track the current command being executed and those that are waiting to be executed by using the call stack and the message queue.

3. Describe the difference between asynchronous and synchronous code
- Synchronous code is code in which the order of execution is guaranteed.
- Asynchronous code does not have a guaranteed order of execution. One common way asynchronicity is introduced to our code is through a `setTimeout` or `setInterval` function. These functions invoke their callbacks after a minimum delay, either once for `setTimeout` or on a regular interval for `setInterval`.
- In the future we'll see that asynchronous code can also help us when we are communicating with other machines. A response across the web from a server will be handled asynchronously, meaning we won't know exactly when we'll get our answer, but when it makes it to us it'll go into our message queue and handled when our call stack is empty. Something to look forward to!

4. Execute the asynchronous function setTimeout with a callback.
- `setTimeout` takes in two arguments that we are typically concerned with: a callback and a delay.
- The callback is the function that is to be invoked at a later time.
- The delay is the minimum amount of time (in milliseconds) for us to wait before invoking the callback. We say minimum because if a function is already being executed at that time, we must wait for it to finish executing since JavaScript is a single-threaded language and can only perform one command at a time.
- Less common, but definitely useful, `setTimeout` can also take in additional optional arguments to pass to the callback function when it it invoked. This is a similar syntax to how `bind` allows us to pass arguments to a function when it is later invoked.
```js
// A basic example using a defined callback and delay
function sayHi() {
  console.log("Hello world!");
}
setTimeout(sayHi, 1000)

// Using an argument passed to setTimeout to pass along to the callback
function saySomething(phrase){
  console.log("You said: " + phrase);
}
setTimeout(saySomething, 1000, "banana");

// Defining the callback as an anonymous function within setTimeout
setTimeout(() => {
  console.log("I'm an anonymous function! I'm still a callback!")
}, 1000)
```

5. Given the function `function asyncy(cb) { setTimeout(cb, 1000); console.log("async") }` and the function `function callback() { console.log("callback"); }`, predict the output of `asyncy(callback);`
- This may be easier to see as a code block:
```js
function asyncy(cb) {
  setTimeout(cb, 1000);
  console.log("async")
}

function callback() {
  console.log("callback");
}

asyncy(callback);
```
- We know that the first two blocks listed are function declarations, meaning they are not immediately executed. The only code that executes any commands is the final invocation of `asyncy(callback);`.
- Since we are invoking `asyncy`, we step into this function to see what needs to be run next.
- The first line of the function is setting a timeout to invoke our callback function after 1 second. Immediately after setting up this timeout, we console log the string `async`.
- This console log completes the `asyncy` function. If there was any code after our invocation of `asyncy`, it would begin to be run at this point. Since there is none, the only thing left for our program to do is wait for our timeout to elapse.
- After our 1 second has finished, our callback is invoked. `callback` is logged in the console. At this point, our call stack and our message queue are both empty and our program is complete.
```js
// final output:
async
callback
```

6. Use setInterval to have a function execute 10 times with a 1 second period. After the 10th cycle, clear the interval.
- We can implement this functionality multiple ways. We can be strict about how we define the interval or we can define this more dynamically:
```js
// Specifically repeats 10 times, once per second
function repeat10(cb) {
  let count = 0;
  const myInterval = setInterval(() => {
    if (count < 10) {
      count++;
      cb();
    } else {
      console.log("clearing")
      clearInterval(myInterval)
    }
  }, 1000);
}

function sayHi() {
  console.log("Hello world!");
}

repeat10(sayHi);

// Repeats a number of times and at an interval specified by the function
function intervalCount(cb, delay, amount) {
  const interval = setInterval(function() {
    cb();
    amount--;
    if (amount === 0) {
      clearInterval(interval);
    }
  }, delay);
}

intervalCount(sayHi, 1000, 10);
```

7. Write a program that accepts user input using Node’s readline module
- We can take input from a user with the `readline` module. `readline` is part of Node, we just need to require the module so that we can utilize its functionality.
- After pulling in the `readline` module, we can create our interface. In our case, we are setting up a standard interface using the standard input `process.stdin` and standard output `process.stdout`. Running our code in the terminal, this means that we are going to expect the user to type into the terminal for input and we are going to print to the terminal for our output.
- Once our interface is created, we can use the `question` method in order to prompt the user. `question` takes in a string to display to the user (the question we want an input for) as well as a callback. The callback is the function that will be invoked when a user enters their response, and thus captures the response as an argument.
- In the example below, we require the `readline` module, create our interface, then ask the user two questions.
- After the first question, we capture the response as a `name` variable, then ask another question.
- After the second question, we capture the response as a `color` variable. We've gotten all of the input that we need, so we then use the values to print out our response. (You can imagine many other things we can do instead of just console logging, such as responding conditionally based on their input ("I don't like green"), parsing their string inputs into numbers to compare for a guessing game (second project for today), etc.)
```js
const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("What's your name? ", name => {
  rl.question("What's your favorite color? ", color => {
    console.log("Nice to meet you, " + name + "! I also like the color " + color + "!");
  });
});
```
