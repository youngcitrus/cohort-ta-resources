## Promises - Part 1 (W6D2) - Learning Objectives

### Promises
1. Instantiate a Promise object
- We can instantiate a Promise object using the `new` keyword.
- The Promise takes in a callback that we can invoke, taking in two arguments: typically labelled `resolve` and `reject`.
    - `resolve` is invoked when we want to indicate our function has successfully completed. A value can be passed as the successful return value.
    - `reject` is invoked when we want to indicate that our function failed in some way. A value can be passed as the fail value (what would be used in a `catch` or the second argument to `then`).
```javascript
function pause(numberOfSeconds) {
  return new Promise((resolve, reject) => {
    // resolve is invoked to indicate a success, reject is a failure
    // if a value is passed to resolve, it will be caught as the first argument to .then()
    // if a value is passed to reject, it will be caught as the first argument to .catch(), or the second argument to .then()
    setTimeout(() => resolve(), numberOfSeconds * 1000);
  });
}
```

2. Use Promises to write more maintainable asynchronous code
    - We can chain .then calls on Promises, ensuring that the callback will not be run until the previous statement has finished executing.
    - Prevents us from having to nest our callbacks
    ```javascript
    // Without Promises, we have to nest our code.
    // These can get very confusing; this is a simple example, but it's already hard to tell what each setTimeout's delay is connected to.
    setTimeout(() => {
        console.log(message)
        setTimeout(() => {
            console.log(message.toUpperCase() + "!")
            setTimeout(() => {
                console.log(message + "?")
                setTimeout(() => {
                    console.log(message.toLowerCase() + "...")
                }, 1 * 1000)
            }, 3 * 1000)
        }, 2 * 1000)
    }, 1 * 1000)

    // With Promises, we write more code up front in order for us to have more readable and maintainable code
    // We define our promises
    function promise1(message, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(message)
            }, delay * 1000)
        })
    }

    function promise2(message, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(message.toUpperCase() + "!")
            }, delay * 1000)
        })
    }

    function promise3(message, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(message + "?")
            }, delay * 1000)
        })
    }

    function promise4(message, delay) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(message.toLowerCase() + "...")
            }, delay * 1000)
        })
    }

    // Then we chain can chain them however we like.
    // Returning our strings from our Promises is adding flexibility to our code, allowing us to use the results however we like.
    // We replaced the complicated nesting with more modular chaining of .then
    promise1("hello", 1)
        .then(res1 => {
            console.log(res1);
            return promise2("hi", 2);
        })
        .then(res2 => {
            console.log(res2);
            return promise3("hey", 3);
        })
        .then(res3 => {
            console.log(res3);
            return promise4("what's up", 1);
        })
        .then(res4 => {
            console.log(res4);
        });
    ```
3. Use the fetch API to make Promise-based API calls
```javascript
// init is an optional object argument to customize the method (default is 'GET'), headers, or body of the request
// For example, it could take the form:
    // const init = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{"title": "Sir", "name": "Robin"}' }
fetch(url, init).then(response => {
    // do something with the response
    // common first action to take would be parsing the response
        // parsing json with response.json(), or text with response.text()
}).then(data => {
    // since fetch is returning a promise, we can chain on as many .then calls as we need
})
```
