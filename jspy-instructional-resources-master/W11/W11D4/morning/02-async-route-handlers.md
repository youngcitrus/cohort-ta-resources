## Asynchronous Route Handlers

### Why would we need to worry about asynchronous routes?
- Whenever we interact with a database, we have to wait on a response before we can create a server response (generate the HTML for the associated records, for example) to send back to the client.

### Async/Await
- Since the final argument to an express route is a callback that handles the specified route, we can indicate that we want the handler to be asynchronous by using the `async` keyword.
```js
app.get('*', async (req, res) => {
 const result = await someAsynchronousFunction(); // commonly an interaction with the database
 res.send(result);
});
```

### Errors with async routes
- We can use our standard `try`/`catch` blocks to catch an error that happends in our asynchronous function.
- An important distinction to note when using these blocks is that our handler is now capturing the `next` argument that we're used to seeing with custom middleware. When we invoke `next` with an argument, we are indicating that an error has occurred, so express should jump to its error handler (or a custom one that we defined).
- In order for us to trigger this functionality, all we have to do is invoke `next(err)` in the catch block:
```javascript
app.get('*', async (req, res, next) => {
 try {
   const result = await someAsynchronousFunction();
   res.send(result);
 } catch (err) {
   next(err);
 }
});
```

### Asynchronous wrapper function
- Since we need to implement this `try`/`catch` block with the `next(err)` invocation in every asynchronous route, we can set up a helper function. This function will cut out the boilerplate code from each individual route and allow us to write code more consistent with the synchronous routes we are already used to.
```js
const asyncHandler = (handler) => {
 return (req, res, next) => {
   return handler(req, res, next).catch(err => next(err));
 };
};

// We are utilizing ES6 implicit returns of single-line => functions to shrink this to one line.
// This can be a little confusing, so you'll still often see the above implementatin.

const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

app.get('*', asyncHandler(async (req, res) => {
 const result = await someAsynchronousFunction();
 res.send(result);
}));
```
- If an error occurs in the handler that we write for this particular route, the wrapper function will have its `.catch` triggered, which allows the error to be handled as expected without the boilerplate code being written out for each route.
