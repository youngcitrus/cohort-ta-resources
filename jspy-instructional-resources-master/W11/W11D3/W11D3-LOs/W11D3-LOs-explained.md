## HTML Forms (W11D3) - Learning Objectives

### HTML Forms
1. Describe the interaction between the client and server when an HTML form is loaded into the browser, the user submits it, and the server processes it
- Below is an example of a form in regular HTML for our reference (not Pug).
```html
<form action="/users" method="post">
  <label>Username:
    <input type="text" name="user[username]">
  </label>
  <label>Email:
    <input type="email" name="user[email]"> 
  </label>
  <label>Age:
    <input type="number" name="user[age]">
  </label>
  <label>Password:
    <input type="password" name="user[password]">
  </label>
  <input type="submit" value="Sign Up">
</form>
```
- The `action` attribute of the form element defines the url that the request is made to, ie what route our request is going to hit on our server.
  - We can use multiple formats for this url:
    - absolute URL: A complete url path such as https://www.wellsfargo.com/transfers
    - relative URL: Just providing a route will send the request to the same domain that we are one. Using `/users` when we are running on localhost in development will send the request to localhost:3000/users
    - no URL - form will be sent to the same page(url) the form is present on
- The `method` attribute defines the HTTP verb that will be used with the request ('GET' or 'POST')
  - If the `POST` method is used, form data is appended to the body of the HTTP request.
  - Only the `GET` and `POST` methods may be specified on the form. In order to do `PUT`, `DELETE`, or other methods, we must use `AJAX` requests using the `fetch` API, for example.
- The server receives a string that will be parsed in order to get the data
as a list of key/value pairs.
  - The `name` attribute of each input is used as the key, with the value of the input used value in the key/value pair.
  - We can create nested objects within the parsed data by providing a name format `outerKey[innerKey]`. When this is parsed by express (see LO 3 and 4 below), we end up with a a nested `req.body`. From the example above we would see:
  ```js
  console.log(req.body);
  /*
  {
    user: {
      username: _value_,
      email: _value_,
      age: _value_,
      password: _value_
    }
  }
  */
  ```
  - This could be extra helpful if we have multiple categories of information in the form we are submitting and want to have a way to easily distinguish between them.

2. Create an HTML form using the Pug template engine
- We can translate the above form into Pug fairly directly.
- Any attributes that we would include on an HTML tag would be included in parentheses in the template, with nested tags being indented.
- We've added some functionality in this example by including the hidden input for our csrf token (See LO 8) as well as providing values for our inputs. The values will help us retain content when a user sends an incorrectly filled out form instead of sending back a blank form and losing their input. Notice no `value` is used for password because we always want the user to type in that information.
```pug
form(method="post" action="/users")
  input(type="hidden" name="_csrf" value=csrfToken)
  label(for="user[username]") Username:
    input(type="username" id="username" name="username" value=username)
  label(for="user[email]") Email:
    input(type="email" id="email" name="email" value=email)
  label(for="user[age]") Age:
    input(type="age" id="age" name="user[age]" value=age)
  label(for="user[password]") Password:
    input(type="password" id="password" name="user[password]")
  input(type="submit" value="Sign Up")
```

3. Use express to handle a form's POST request
- In the 'POST' route, we can check that our user's input passes all of our data validation checks, then, if successful, create a new record for that user within our database. (In the project for today we just added an object into an array to simulate this process.)
- After we create our new record, we can redirect the user to another page. In this example, we are redirecting to our root page, but we could have redirected to a user page, an index, a welcome page, etc.
```js

app.get('/create', csrfProtection, (req, res, next) => {
	res.render('create', {
		title: 'Create a user',
		errors: [],
		csrfToken: req.csrfToken()
	});
});

app.post(`/users`, csrfProtection, checkFields, async (req, res) => {
  const { username, email, age, password } = req.body.user;

  // Our errors attribute was created by our checkFields middleware
  // If we had errors, we're rendering the 'create' form again, passing along the errors as well as the user data so that we can prepopulate those fields with the values that were originally submitted
  if (req.errors.length >= 1) {
    res.render(`create`, { 
      title: 'Create a user',
      errors: req.errors, 
      username, 
      email, 
      age,
      csrfToken: req.csrfToken()
    });
    return;
  }

  await User.create({username, email, age, password})

  res.redirect(`/`);
});
```

4. Use the built-in `express.urlencoded()` middleware function to parse incoming request body form data
- The express middleware `urlencoded` comes with the express library, we just need to tell our app to use it on all requests.
- Invoking `app.use({middlewareFunction})` will set up all requests to pass through this function.
- The `urlencoded` function will decode the body of our form post requests, allowing our routes to access the `req.body` property with each field as a property on this object.
- The `extended: true` is a newer parsing library compared to leaving it off or false, which allows for objects and arrays to be encoded. We'll always want to use this (you'll most likely see warnings in your terminal if you leave it off).
```js
app.use(express.urlencoded({
  extended: true,
}));
```

5. Explain what data validation is and why it's necessary for the server to validate incoming data
- Data validation is the process of ensuring that the incoming data is correct.
- This could mean anything related to the format or content of the data such as:
  - the type of data (is this actually a number?)
  - the value makes sense (is the age a positive number?)
  - length of content (is the password at least 8 characters long?)
  - etc.
- Even though you could add add validations on the client side, client-side
validations are not as secure and can be circumvented. We could send a postman request to our server's routes, for example, and not utilize our client-side application at all.
- Because client-side validations can be circumvented, it's necessary to implement server-side data validations as well. 
- Handling bad request data in our route handlers allows us to return 400 level messages with appropriate messaging to allow the user to correct their bad request.
- If we didn't have data validations on our server and allowed the bad data to go all the way to the database, the system would return a the generic "500: Internal Server Error", which is not helpful for the user.

6. Validate user-provided data from within an Express route handler function
- Before we attempt to create a record for this new user, we can verify that the information submitted by the user exists, is in a valid format, etc.
- If anything is outside of our expectation, we can handle the request differently (rendering the form again, displaying errors, etc.) as opposed to if the information is valid (where we would typically want to redirect the user to a new page).
```js
app.post('/create', csrfProtection, async (req, res) => {
  const { username, email, age, password, confirmedPassword } = req.body;
	const errors = [];

	if (!username) {
		errors.push('Please provide a username.');
	}

	if (!email) {
		errors.push('Please provide an email.');
	}

	if (!age) {
		errors.push('Please provide an age.');
	}

  const ageAsNum = Number.parseInt(age, 10);

  if (age &&  (ageAsNum < 0 || ageAsNum > 120)) {
    errors.push('Please provide an age between 0 and 120');
  }

	if (!password) {
		errors.push('Please provide a password.');
	}

	if (password && password !== confirmedPassword) {
		errors.push('The provided values for the password and password confirmation fields did not match.');
	}

	if (errors.length > 0) {
		res.render('create', {
			title: 'Create a user',
      username,
      email,
      age,
			csrfToken: req.csrfToken(),
			errors
		});
		return;
	}

  const newUser = await User.create({username, email, age, password})
	res.redirect(`/user/${newUser.id}`);
});
```

7. Write a custom middleware function that validates user-provided data
- Separating out the validation of our inputs into its own middleware allows us to reuse this functionality for multiple routes.
- When writing middleware, we take in the request, response, and a reference to the `next` function, which express is going to utilize to set up our chain of functions to invoke.
- Our middleware can interact with and modify our request and response objects however we like. For validating user input, it's convenient for us to be able to add in custom error messages to our request object if any of the data does not match our expectations. That way our routes can check to see if any of these errors occurred and respond appropriately.
- After implementing the functionality of our middleware, we invoke the `next` function in order to continue the middleware chain. I like to think of this as similar to invoking the `resolve` function of a Promise when the functionality we are implementing is complete.
```js
const validationMiddleware = (req, res, next) => {
	const { username, email, age, password, confirmedPassword } = req.body;
  const ageAsNum = Number.parseInt(age, 10);
	const errors = [];

	if (!username) {
		errors.push('Please provide a username.');
	}

	if (!email) {
		errors.push('Please provide an email.');
	}

	if (!age) {
		errors.push('Please provide an age.');
	}

  if (age &&  (ageAsNum < 0 || ageAsNum > 120)) {
    errors.push('Please provide an age between 0 and 120');
  }

	if (!password) {
		errors.push('Please provide a password.');
	}

	if (password && password !== confirmedPassword) {
		errors.push('The provided values for the password and password confirmation fields did not match.');
	}

	req.errors = errors;
	next();
};
```
- With this function written, we can pass it as middleware to any route that requires it.
- With the validations being run, we can then interact with the `req.errors` array that our middleware created.
```js
app.post('/create', csrfProtection, validationMiddleware, async (req, res) => {
	const { firstName, lastName, email, password, confirmedPassword } = req.body;
	const errors = req.errors;

	if (errors.length > 0) {
		res.render('create', {
			title: 'Create a user',
      username,
      email,
      age,
			csrfToken: req.csrfToken(),
			errors
		});
		return;
	}

  await User.create({username, email, age, password})
	res.redirect('/');
});
```

8. Use the csurf middleware to embed a token value in forms to protect against Cross-Site Request Forgery exploits
- To set up CSRF protection, we want to utilize two tools: the `csurf` library and the `cookie-parser` library (since we'll use cookies for our csrf protection implementation)
- Once pulled in to our main file, we can create a csrfProtection middleware as well as tell our app to use the cookie parser:
```js
const csrfProtection = csrf({ cookie: true });
app.use(cookieParser());
```
- Creating the middleware function is not enough to implement csrf protection. Anywhere that requires us to create or submit forms we need to utilize the middleware within the route. We do this by passing it as an argument to our `app.get` or `app.post` function calls.
- When creating our forms, we want to be able to provide a `_csrf` input field, hidden from the user.
- The value that we supply to this field is obtained from invoking our `req.csrfToken()` function that was created for us from the middleware.
- The middleware is also supplied to the 'POST' routes that respond to these submissions in order to check that the token was actually created by our application.
```js
const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const { User } = require('./models');

const app = express();

const port = process.env.PORT || 3000;

const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

app.get('/create', csrfProtection, (req, res, next) => {
	res.render('create', {
		title: 'Create a user',
		messages: [],
		csrfToken: req.csrfToken()
	});
});


app.post('/create', csrfProtection, validationMiddleware, async (req, res) => {
	const { username, email, password } = req.body;
	const errors = req.errors;

	if (errors.length > 0) {
		res.render('create', {
			title: 'Create a user',
      username,
      email,
      age,
			csrfToken: req.csrfToken(),
			errors
		});
		return;
	}

  await User.create({username, email, age, password})
	res.redirect('/');
});
```
- The Pug files that create thes forms can simply create a hidden input field:
```pug
// Other content before the form
form(action='/create' method='post')
  input(type='hidden' name="_csrf" value=csrfToken)
  div(class="form-group")
    label(for='username') Username:
    input(id='username' class="form-control" name='username' value=username type='text')
  // Other form fields
  div
    input(type='submit' value="Create User" class='btn btn-primary') 
```
