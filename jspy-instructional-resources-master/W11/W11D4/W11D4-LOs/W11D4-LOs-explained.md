## Full-Stack (Data-Driven Web Sites) (W11D4) - Learning Objectives

### Data-Driven Web Sites
1. Use environment variables to specify configuration of or provide sensitive information for your code
- We can specify environment variables in the command line or script by setting them before the command we are running:
  - `PORT=8080 node app.js` in the terminal
  - `"start": "PORT=8080 node app.js"` in our scripts
- In our app, we can use `process.env.VARIABLE_NAME` to access any environment variables that have been set.
- We can also create a `.env` file to store all of our variables in one location. In order to access these variables, we use the `dotenv` package (see LO #2)
  ```
  PORT=8080
  DB_NAME=cool_app
  DB_USER=cool_app_user
  DB_PASSWORD=cool_app_user_password
  ```

2. Use the `dotenv` npm package to load environment variables defined in an `.env` file
- Adding the `dotenv` package to our project gives us three ways to load environment variables.
  1. In our app, we can require the `dotenv` package and invoke its `configure` method. Any point after this configuration will have access to environment variables defined in `.env`:
  ```js
  require('dotenv').config();
  ```
  2. When starting our application, either in the terminal directly or in a script, we can use `node` or `nodemon`'s `-r` flag to indicate we want to require a package at the very start. By requiring `dotenv/config`, we can omit the line above from our application code.
  - `"start": "nodemon -r dotenv/config app.js"`
  3. Similar to how `sequelize-cli` allows us to run sequelize commands in the command line, we can install `dotenv-cli` to our project with `npm install dotenv-cli` and then use `dotenv` before our commands that need to utilize these variables:
  - `npx dotenv sequelize-cli db:migrate`

3. Recall that Express cannot process unhandled Promise rejections from within route handler (or middleware) functions.
- If an error is thrown in a synchronous route handler or middleware, it will be caught by express error handlers and an error message will be sent back to the client.
- For asynchronous functions, unhandled rejected promises (errors not caught by a `catch` block or `catch` method in a promise chain) will not be handled by the error handlers. The server will not send a response back and the client's browser will hang. We need to catch the error and pass it along to the error handlers in order for the standard error-handling functionality to occur.

4. Use a Promise catch block or a `try`/`catch` statement with `async`/`await` to properly handle errors thrown from within an asynchronous route handler (or middleware) function
- To catch asynchronous errors, we've seen that we can use a `try`/`catch` block when using the `async`/`await` syntax, or we can chain a `.catch` on to a Promise directly.
- With express, we can indicate that an error has occurred by invoking the `next` function with an argument. The argument is the error that has occurred from our asynchronous code.
- Using our `try`/`catch` syntax:
```javascript
app.get('*', async (req, res, next) => { // we specify an async function and capture the 'next' parameter
  try {
    const result = await someAsynchronousFunction();
    res.send(result);
  } catch (err) { // If an error occurs in the above try block, it is captured as err
    next(err); // The err variable that we captured is passed to next so that error handlers can interact with it
  }
});
```
- Using our Promise chains:
```js
app.get('*', async(req, res, next) => {
  someAsyncFunction().then(() => {
    // Assume some command is here that throws an error
  })
  .catch(err => {
    // We catch it here to make express happy
    next(err);
  })
});
```

5. Write a wrapper function to simplify catching errors thrown within asynchronous route handler (or middleware) functions
- The process of wrapping our asynchronous handlers in `try`/`catch` blocks is so common that we will often create a helper wrapper function in order to DRY up our code. It also makes the route handlers that we create look more similar to the synchronous ones that we are used to:
  ```javascript
  const asyncHandler = (handler) => {
    return (req, res, next) => {
      return handler(req, res, next).catch(err => next(err));
    };
  };

  // We are utilizing ES6 implicit returns of single-line => functions to shrink this to one line.
  // This can be a little confusing, so you'll still often see the above implementatin.
  // THIS IS THE SAME AS THE ABOVE FUNCTION! Just a different structure.
  const asyncHandler = (handler) => (req, res, next) => handler(req, res, next).catch(next);

  // By wrapping our normal route handler in the custom asyncHandler that we created, we don't have to worry about writing try/catch blocks or chaining .catch onto promises for all of our different routes
  app.get('*', asyncHandler(async (req, res) => {
    // our asyncHandler is returning the function that invokes our handler defined here, with the addition of the catch method and invocation of next(err) if an error occurs
    const result = await someAsynchronousFunction();
    res.send(result);
  }));
  ```

6. Use the `morgan` npm package to log requests to the terminal window to assist with auditing and debugging
- Adding the `morgan` package lets us log the requests that hit our server. The `dev` format specifies the HTTP method/verb, the path, status code, response time, and content length of the response.
- `npm install morgan`
  ```javascript
  const morgan = require('morgan');
  app.use(morgan('dev'));
  ```

7. Add support for the Bootstrap front-end component library to a Pug layout template
- Adding in the Bootstrap stylesheet and script to our template allows us to use classes that Bootstrap has defined for us with default styles. These are lines that you would copy over from Bootstrap template, not things that you would memorize https://getbootstrap.com/docs/4.4/getting-started/introduction/#starter-template
- The important takeaway is knowing that these lines are what are allowing us to use the classes Bootstrap has defined for us.
```pug
  doctype html
  html
    head
      meta(charset='utf-8')
      meta(name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no')

      // The following line is importing the bootstrap css file
      link(rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' integrity='sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh' crossorigin='anonymous')

      title Reading List - #{title}
    body
      nav(class='navbar navbar-expand-lg navbar-dark bg-primary')
        a(class='navbar-brand' href='/') Reading List
      .container
        h2(class='py-4') #{title}
        block content

      // The following lines are importing the bootstrap js files
      script(src='https://code.jquery.com/jquery-3.4.1.slim.min.js' integrity='sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n' crossorigin='anonymous')
      script(src='https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js' integrity='sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo' crossorigin='anonymous')
      script(src='https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js' integrity='sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6' crossorigin='anonymous')
```

8. Install and configure Sequelize within an Express application.
- We need to install packages associated with sequelize and postgres:
  ```
  npm install sequelize@^5.0.0 pg@^8.0.0
  npm install sequelize-cli@^5.0.0 --save-dev
  ```
- Creating a `.sequelizerc` file at the root of our app allows us to specify the paths to where our config file should be read from and where the directories for models, migrations, and seeds should be created:
  ```js
  const path = require('path');

  module.exports = {
    'config': path.resolve('config', 'database.js'),
    'models-path': path.resolve('db', 'models'),
    'seeders-path': path.resolve('db', 'seeders'),
    'migrations-path': path.resolve('db', 'migrations')
  };
  ```
- Run our sequelize initialization. This reads from `.sequelizerc` to see if we are overwriting any of the default config values, then generates the directories and config file.
  - `npx sequelize init`
- Create our database and user in `psql`
  ```
  CREATE USER reading_list_app WITH PASSWORD 'strongpassword' CREATEDB;
  CREATE DATABASE reading_list WITH OWNER reading_list_app;
  ```
- Add environment variables to `.env`
  ```
  DB_USERNAME=reading_list_app
  DB_PASSWORD=strongpassword
  DB_DATABASE=reading_list
  DB_HOST=localhost
  ```
- If we are using a config module, add these new variables in:
  ```javascript
  module.exports = {
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8080,
    db: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
    },
  };
  ```
- In the config file generated by sequelize (we specified `./config/database.js` in our example), set up the configuration to point to these values for any environment that we need:
  ```javascript
  const {
    username,
    password,
    database,
    host,
  } = require('./index').db;

  module.exports = {
    development: {
      username,
      password,
      database,
      host,
      dialect: 'postgres',
      seederStorage: 'sequelize'
    },
  };
  ```
- If we didn't have a config module, we could use the environment variables directly:
  ```javascript
  module.exports = {
    development: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      host: process.env.DB_HOST,
      dialect: 'postgres',
      seederStorage: 'sequelize'
    },
  };
  ```

9. Use Sequelize to test the connection to a database before starting the HTTP server on application startup
- To test our connection, we get a reference to our database through the models directory that was created for us. We can call `.authenticate` on the instance of `sequelize` that is exported from this module.
  ```javascript
  #!/usr/bin/env node
  // This file is being run to kick off our server. The app is being imported separately. If these concerns were in the same file, the process of importing the db and invoking authenticate would remain the same.

  const { port } = require('../config');

  const app = require('../app');
  const db = require('../db/models');

  // Check the database connection before starting the app.
  db.sequelize.authenticate()
    .then(() => {
      console.log('Database connection success! Sequelize is ready to use...');

      // Start listening for connections.
      app.listen(port, () => console.log(`Listening on port ${port}...`));
    })
    .catch((err) => {
      console.log('Database connection failure.');
      console.error(err);
    });
  ```

10. Define a collection of routes (and views) that perform CRUD operations against a single resource using Sequelize
- Before creating routes and views, we should generate models, migrations, and seeds in order to have data to work with. This is the same process as working with sequelize previously.
  1. Generate our model and migration
    - `npx sequelize model:generate --name Book --attributes "title:string, author:string, releaseDate:dateonly, pageCount:integer, publisher:string"`
  2. Update the model and migration files to include constraints such as character liimts, `allowNull`, and `unique: true`, how to drop the table in the migration, etc.
  3. Apply the migrations to our database. Remember to include `dotenv` to include the environment variables. This is needed because `db:migrate` has to connect to our database, and the credential information is stored in our environment variables.
    - `npx dotenv sequelize db:migrate`
  4. Generate a seed file
    - `npx sequelize seed:generate --name test-data`
  5. Update the seed file to include records that we want to add to the database, as well as what to delete if we want to undo the seed.
  6. Apply the seed file. We need to prepend `dotenv` for the same reasons as our migrations.
    - `npx dotenv sequelize db:seed:all`
- Now that we have our database created and seeded, we can proceed with making our routes.
- In the file that we are creating our routes, require the models directory.
  ```js
  const db = require('./db/models');
  ```
- If we have any routes that need to post data (creating, updating, destroying records), we need to provide csrf protection. Add the `csurf` and `cookie-parser` packages to our project. Within our app, indicate that we are using cookieParser and parsing our requests:
  ```js
  const cookieParser = require('cookie-parser');

  app.use(cookieParser());
  app.use(express.urlencoded({ extended: false })); 
  // We can also use the bodyParser library instead of express's urlencoded function
  // app.use(bodyParser.urlencoded({ extended: false }))
  ```
- Our routes need to have access to the csrfProtection middleware that comes from the `csurf` package we added.
  ```js
  const csrf = require('csurf');

  const csrfProtection = csrf({ cookie: true });
  ```
- In our routes, set up asynchronous route handlers and await the query to our database. We can then pass the results to our views.
  - Getting an index of records
    ```javascript
    router.get( '/', asyncHandler(async (req, res) => {
      const books = await db.Book.findAll({ order: [ [ 'title', 'ASC' ] ] });
      res.render('book-list', { title: 'Books', books });
    }));
    ```
  - Getting a single records
    ```javascript
    router.get( '/book/:id(\\d+)', asyncHandler(async (req, res) => {
      const bookId = parseInt(req.params.id, 10); // converting the string into an integer
      const book = await db.Book.findByPk(bookId); // get a reference to our Book instance
      res.render('book-display', { title: 'Book Display', book });
    }));
    ```
  - Posting to create a record
    ```javascript
    router.post( '/book/add', csrfProtection, bookValidators, asyncHandler(async (req, res) => {
      // destructure the fields of the book from the request body
      const { title, author, releaseDate, pageCount, publisher } = req.body;

      // build the instance of the book. We're doing this before validation redirection because our 
      const book = db.Book.build({
        title,
        author,
        releaseDate,
        pageCount,
        publisher
      });

      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        await book.save();
        res.redirect('/');
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('book-add', {
          title: 'Add Book',
          book,
          errors,
          csrfToken: req.csrfToken()
        });
      }
    }));
    ```
  - Editing a record
    ```javascript
    router.post('/book/edit/:id(\\d+)', csrfProtection, bookValidators, asyncHandler(async (req, res) => {
      const bookId = parseInt(req.params.id, 10); // converting the string into an integer
      const bookToUpdate = await db.Book.findByPk(bookId); // get a reference to our Book instance

      const {
        title,
        author,
        releaseDate,
        pageCount,
        publisher,
      } = req.body;

      // we extracted and then repackaged the relevent terms from the request's body
      const book = {
        title,
        author,
        releaseDate,
        pageCount,
        publisher,
      };

      // The validation results can be accessed by invoking the function with our request
      const validatorErrors = validationResult(req);

      // If the fields all passed validation, validatorErrors will be an empty array
      // This means that we can update the book and send the user back to the main page
      if (validatorErrors.isEmpty()) {
        await bookToUpdate.update(book);
        res.redirect('/');
      // If some fields did not pass the validator, we want to keep them on the form page
      // and display the message associated with each error
      } else {
        // Convert the error objects into just their message strings
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('book-edit', {
          title: 'Edit Book',
          book: { ...book, bookId },
          errors,
          csrfToken: req.csrfToken(),
        });
      }
    }));
    ```
  - Deleting a record
    ```javascript
    router.post('/book/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
      // 1. Convert the id in the route from a string to an integer
      // 2. Get a reference to the book that matches this id
      // 3. Destroy the book record
      const bookId = parseInt(req.params.id, 10);
      const book = await db.Book.findByPk(bookId);
      await book.destroy();

      // Instead of finding and then deleting an instance, we could combine these into one method on the class
      // db.Book.destroy({ where: { id: bookId } })

      // Redirect to the main page
      res.redirect('/');
    }));
    ```
  
11. Handle Sequelize validation errors when users are attempting to create or update data and display error messages to the user so that they can resolve any data quality issues
- We've seen two ways to implement data validation on the server. First is through sequelize model validations, and the second is from the `express-validator` package.
- For sequelize validations, we add a `validate` key on the model for each field we would like to validate: 
  ```js
  module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for Title',
          },
          notEmpty: {
            msg: 'Please provide a value for Title',
          },
          len: {
            args: [0, 255],
            msg: 'Title must not be more than 255 characters long',
          }
        }
      },
      author: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for Author',
          },
          notEmpty: {
            msg: 'Please provide a value for Author',
          },
          len: {
            args: [0, 100],
            msg: 'Author must not be more than 100 characters long',
          }
        }
      },
      releaseDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for Release Date',
          },
          isDate: {
            msg: 'Please provide a valid date for Release Date',
          }
        }
      },
      pageCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for Page Count',
          },
          isInt: {
            msg: 'Please provide a valid integer for Page Count',
          }
        }
      },
      publisher: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Please provide a value for Publisher',
          },
          notEmpty: {
            msg: 'Please provide a value for Publisher',
          },
          len: {
            args: [0, 100],
            msg: 'Publisher must not be more than 100 characters long',
          }
        }
      }
    }, {});
    Book.associate = function(models) {
      // associations can be defined here
    };
    return Book;
  };
  ```
- With these validations in place, when we attempt to save a new instance (Book in this case), we will result in an error being thrown. This error will have a `name` property equal to `SequelizeValidationError`. We can implement a `try`/`catch` block to see if this error occurred, and if it did, render our form again with the error messages:
  ```js
  router.post('/book/add', csrfProtection, asyncHandler(async (req, res, next) => {
    const {
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    } = req.body;

    const book = db.Book.build({
      title,
      author,
      releaseDate,
      pageCount,
      publisher,
    });

    try {
      await book.save();
      res.redirect('/');
    } catch (err) {
      if (err.name === 'SequelizeValidationError') {
        const errors = err.errors.map((error) => error.message);
        res.render('book-add', {
          title: 'Add Book',
          book,
          errors,
          csrfToken: req.csrfToken(),
        });
      } else {
        next(err);
      }
    }
  }));
  ```
- We can also implement validations using the `express-validator` package, which we can use as middleware in our routes.
- We extract a reference to the `check` and `validationResult` functions from the `express-validator` library:
  ```js
  const { check, validationResult } = require('express-validator');
  ```
- We can set up a group of validations using an array. Each individual validation invokes `check` with the field that we are validating, then chains on the specific validations and messages we want to associate with that field:
  ```js
  const bookValidators = [
    check('title')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Title')
      .isLength({ max: 255 })
      .withMessage('Title must not be more than 255 characters long'),
    check('author')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Author')
      .isLength({ max: 100 })
      .withMessage('Author must not be more than 100 characters long'),
    check('releaseDate')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Release Date')
      .isISO8601()
      .withMessage('Please provide a valid date for Release Date'),
    check('pageCount')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Page Count')
      .isInt({ min: 0 })
      .withMessage('Please provide a valid integer for Page Count'),
    check('publisher')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a value for Publisher')
      .isLength({ max: 100 })
      .withMessage('Publisher must not be more than 100 characters long')
  ];
  ```
- With these validations set up, we can pass the array of middleware to any route that needs to validate the input. Inside the route we can invoke `validationResult` with the request object to get access to an array of any errors that occurred with the validations. From there, we can determine if we need to render the route as normal if the the array is empty, or if we need to display errors to the user because of the failed validations.
  ```js
  // This is the same route as above, repeated for convenience
  // Notice the bookValidators array passed in as middleware
  router.post('/book/add', csrfProtection, bookValidators, asyncHandler(async (req, res) => {
      const { title, author, releaseDate, pageCount, publisher } = req.body;

      const book = db.Book.build({
        title,
        author,
        releaseDate,
        pageCount,
        publisher
      });

      // The results of the validations are being captured by validatorErrors. If all of the validations passed, it will be an empty array.
      const validatorErrors = validationResult(req);

      if (validatorErrors.isEmpty()) {
        // No errors occurred, so save the new book
        await book.save();
        res.redirect('/');
      } else {
        // Validations failed. Extract the `msg` from each error and pass the array to the form template so that it can iterate over them and display them to the user
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('book-add', {
          title: 'Add Book',
          book,
          errors,
          csrfToken: req.csrfToken()
        });
      }
    })
  );
  ```

12. Describe how an Express.js error handler function differs from middleware and route handler functions
- Error handlers have a very similar syntax to middleware and route handlers that we create. In addition to the `req`, `res`, and `next` arguments that we captured, we also capture the error (typically `err`) as the first argument to the handler.
- Error handlers are invoked whenever an error occurs in a synchronous route handler or if `next` is invoked *with and argument*.
- When either of these occur, express will continue parsing the file to see if we have any handlers defined below the route to take care of the error. This is why it's important to have our middleware up top so that it is used before routes are encountered, then our routes, then our error handlers at the bottom.
- Just like middleware, we can chain multiple error handlers on to each other. In order to pass control off to the next error handler, we simply invoke `next(err)`, making sure to pass the error in as the argument.
- If we don't have any custom error handlers, express has a default one that will respond to the client with a status of `500` and, if in development, display the error's stack trace. It's important to note that if an asynchronous function is rejected and not caught, the error handlers will not be triggered, causing the server to hang and no response sent back to the client.

13. Define a global Express.js error-handling function to catch and process unhandled errors
- Our handler uses `app.use()` with a callback that takes in `err`, `req`, `res`, and `next`.
- If the err object has a status key set on it, we set our res's status to that value, otherwise we use a generic 500 to indicate an internal server error occurred.
- We render a custom error template with the error information. In the example below, we set up different displays based on whether we are in a production environment or not. If we are, we simply state that an error occurred. The idea is that the end-user doesn't need to know the inner workings of our server, just that we messed up. If we aren't in production, we also pass the specific error message and stack trace to the template in order to render it to the page. This allows us to debug our code in development.
```js
// (middleware and routes defined above)

// Generic error handler.
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  const isProduction = process.env.NODE_ENV === 'production';
  res.render('error', {
    title: 'Server Error',
    message: isProduction ? 'An error occurred!' : err.message,
    stack: isProduction ? null : err.stack
  });
});
```

14. Define a middleware function to handle requests for unknown routes by returning a 404 NOT FOUND error
- If a request comes in for a route that does not match anything that we have created, we can capture the request and throw a specific error for it.
- After all of our routes are defined, we use `app.use` just like our middleware up above. This ensures that the request passes through this handler if it makes it this far without encountering an error.
- In this function we create an error, set the `status` key of the error to 404 (for later use in the error handler), then invoke our error-handling chain by calling `next(err)` with the error we just made:
  ```js
  // Catch unhandled requests and forward to error handler.
  app.use((req, res, next) => {
    const err = new Error("The requested page couldn't be found.");
    err.status = 404;
    next(err);
  });
  ```
- Before our generic error handler, we can define a specific 404 error handler in order to generate a custom page. If an error passes through this handler, we check to see if its status is 404. If the error was created because of the missing route, then this will be the case. When that occurs, we set our response's status to 404 and render our custom template.
  ```js
  // Error handler for 404 errors.
  app.use((err, req, res, next) => {
    if (err.status === 404) {
      res.status(404);
      res.render('page-not-found', {
        title: 'Page Not Found'
      });
    } else {
      next(err);
    }
  });
  ```
- If the error didn't have a status of 404 (if the error happened inside one of our other routes or middleware), then we simply invoked `next(err)` to pass it along to the next error handler in the chain.
