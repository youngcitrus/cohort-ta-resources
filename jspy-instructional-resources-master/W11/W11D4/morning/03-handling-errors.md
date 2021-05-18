## Custom Error Handlers

### Syntax of a custom error handler
- An error handler takes the same format as a custom middleware function that we've implemented previously, except that it takes in the `err` argument first, in addition to the standard `req`, `res`, and `next`.
```js
app.use((err, req, res, next) => {
  console.error(err);
  res.send('An error occurred!');
});
```
- Error handlers come after our route definitions. If an error occurs within one of the routes or middleware that we defined, we continue scanning down the document to see if a custom handler was created to deal with the error.

### Responding with an error status
- When express sends a response to a client, the default status is `200`, indicating everything was ok. If we are handling an error, we want to indicate that this was not the case.
- We can use `res.status(statusNumber)` to override the default `200`
```js
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500); // If no custom status was created by the error, default to 500, a generic internal server error
  // res.send('An error occurred!');
  res.render('error', err.status)
});
```

### Using multiple error handlers
- Just like middleware, we can chain error handlers. We saw in middleware that we had to invoke `next()` at the end of our function. We also saw that to trigger an error handler, we invoke `next(err)`. Having an argument passed to next indicates that an error has taken place.
- By combining these two ideas, we can chaing multiple error handlers together by invoking `next(err)` at the end of our first handler to indicate that we should keep looking for another error handler.
```js
// Error handler to log errors.
app.use((err, req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    // TODO Log the error to the database.
  } else {
    console.error(err);
  }
  next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? null : err.message,
    stack: isProduction ? null : err.stack,
  });
});
```

### Custom 404 pages
- If a user tries to navigate to a route that doesn't exist, we can respond with a custom page to indicate that the page wasn't found.
- After our defined routes we can add another middleware to catch requests that have not been handled by any of our routes:
```js
// (previous route definitions above)

// Catch unhandled requests and forward to error handler.
app.use((req, res, next) => {
  const err = new Error('The requested page couldn\'t be found.');
  err.status = 404;
  next(err);
});
```
- We set the status of the error that we created to `404`, then invoked `next(err)`, indicating an error has occurred. This will now trigger all of the error handlers that we have set up in our chain.
```js
// (potentially other error handlers that we want to invoke before, like logging)

// Error handler for 404 errors.
app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.status(404);
    res.render('page-not-found', {
      title: 'Page Not Found',
    });
  } else {
    next(err);
  }
});

// (potentially other error handlers to invoke if the error was not a 404, like a generic error handler)
```
- Since we had set the `status` of the `err` object to 404 within our middleware, our error handler was able to set the status of the response and render a custom `page-not-found` template.

### Using morgan to log requests
- Related to error handling, seeing the requests that are coming in to our server can help us when developing, especially when attempting to debug our code.
- The `morgan` package is a very simple way to see the HTTP requests that hit our server. It logs the HTTP method/verb, the request path, the response time, and the Content-Length of the response.
- Add `morgan` to your application:
  - `npm install morgan`
- Add the package as middleware to your application:
```js
const morgan = require('morgan');

app.use(morgan('dev'))
```
- `dev` is a predefined format for output. There are more formats and expanded functionality for the package in the documentation: https://github.com/expressjs/morgan
