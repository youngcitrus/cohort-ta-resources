## Express and Pug Templates (W11D2) - Learning Objectives

### Express
1. Send plain text responses for any HTTP request
- In order to set up express in our application, we need to package with `npm install express`
- With express installed, we can create a file that we will use to kick off our application. You'll often see this as `app.js` or `index.js` at the top level of your server, but can be customized for the individual project.
- In our `app.js`, we can require the express package and invoke it to create our server application:
```js
const express = require('express');

// Create the Express app.
const app = express();
```
- The `app` object that we created here is able to respond to incoming requests by defining routes with these helpful functions:
  - `get()` responds to HTTP GET requests
  - `post()` responds to HTTP POST requests
  - `put()` responds to HTTP PUT requests
  - `delete()` responds to HTTP DELETE requests
- Each of these functions accepts two arguments: the route as a string or regex, as well as a callback function to define what we would like to do with the request. The format generally takes the form:
  - `app.get({path}, (req, res) => {functionality})`
- To start our app listening for traffic on a specific port, we can us the `app.listen({portNumber}, {successCallback})` function of our `app` object. We often use the callback just as a confirmation that the app started up successfully.
```js
const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
```
- Now that the app is set up and we know how to create a route, responding with plain text is as easy as using the `res.send({text response})` method inside the route.
```js
app.get('/', (req, res) => {
  res.send('Hello from Express!');
});
```

2. Use pattern matching to match HTTP request paths to route handlers
- When defining routes, express offers us some flexibility in a couple different ways.
  - We are able to capture parameters from our routes and set up restrictions on what characters will match these parameters.
  ```js
  // Capturing a parameter
  app.get('/product/:id', (req, res) => {
    res.send(`Product ID: ${req.params.id}`);
  });

  // Putting a restriction on the parameter
  // This route will only be used if what follows the /product/ is a series of numbers (the + allows for multiple characters)
  // We still capture it as a string, so it needs to be parsed into a number if it is going to be used as such in our function
  app.get('/product/:id(\\d+)', (req, res) => {
    const productId = parseInt(req.params.id, 10);
    res.send(`Product ID: ${productId}`);
  });
  ```
  - We can set up a string pattern, which is a similar concept to regex. Express sees the special characters in our string and is able to interpret patterns that match those characters.
    - The `?` indicates that the previous character is optional (either 0 or 1 instances will occur)
    - The `+` indicates that the previous character may be repeated (at least 1, but possibly more instances will occur)
    - The `*` indicates a wildcard. Any character and any number of characters will match.
  ```js
  // Within the string, we can use special characters to define patterns, similar to regex.
  // The pattern below can start will any base string (because of the `*`), then must have `prod`, has an optional `u`, must have a `c`, has at least one but possibly more `t` characters, then ends with an optional `s`. 
  app.get('/*produ?ct+s?', (req, res) => {
    res.send('Products');
  });
  ```
  - We can use actual regex to define a pattern.
  ```js
  // Regex allows us to be much more specific and complex with the patterns that we are matching.
  // Don't worry if this looks crazy! You would very rarely need to construct anything so complex, this is just showing the possibilities.
  app.get(/^\/((our-)?produ?ct{1,2}s?|productos)\/?$/i, (req, res) => {
    res.send('Products');
  });
  ```
  - We can use any combination of these in an array to provide multiple options to match.
  ```js
  // Our array of options can have a mixture of the previous pattern definitions, as well as multiple options of each.
  app.get([/^\/(our-)?produ?ct{1,2}s?\/?$/i, '/productos'], (req, res) => {
  res.send('Products');
  });
  ```

3. Use the Pug template engine to generate HTML from Pug templates to send to the browser
- To use pug templates in our application we can install the package with `npm install pug@^2.0.0` to install pug 2.0.
- With pug in our application, we can tell express to use it as the view engine:
```js
app.set('view engine', 'pug');
```
- Instead of rendering plain text with `send`, we can render a template by using `res.render({templateName})`.
- By default, express will look in a `views` directory for each template. We can set up this folder with a `{templateName}.pug` file inside that will be rendered.
```js
// Define a route.
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  res.render('layout');
});
```
- In that `layout.pug` file used in the above demo route, we can start setting up our template.
  - The names of tags we would like to create are written out as plain text.
  - To nest tags, we use indentation. Spaces vs. tabs do not matter as long as we are consistent in our files.
  - The content of the tag can be written directly after the tag name
```pug
html
  head
    title My Awesome Title
  body
    h1 My Super Cool Heading
```

4. Pass data to Pug templates to generate dynamic content
- The `render()` method on our `app` can also take in a second argument with an object definining variables to make available within our Pug templates.
```js
app.all('*', (req, res) => {
  console.log(`Request method: ${req.method}`);
  console.log(`Request path: ${req.path}`);

  res.render('layout', { title: 'Pug Template Syntax Sandbox', heading: 'Welcome to the Sandbox!' });
});
```
- We would now be able to utilize the variables in the template file.
  - To use the value directly as content we can use the `=` operator for the element
  - If we want to interpolate the value within a larger string we can use Pug interpolation, which takes the form `My interpolated value is #{variableName}`
```pug
html
  head
    title= title
  body
    h1 My heading says #{heading}
```
5. Use the `Router` class to modularize the definition of routes
- In addition to defining routes directly on the `app` instance that we created, we can create multiple routers from the `express.Router()` function and then utilize them from different base routes.
- This functionality supports the modularity of our app. We'll often want to break up our routes into categories, such as routes for our users vs routes for our tweets, instead of having all of our routes defined in one location.
- When we have an instance of the `Router` we can define routes with the same `get()`, `post()`, `put()`, and `delete()` methods.
```js
// In our main app.js file
const express = require('express');
const userRoutes = require('./routes/users.js') // see following code block
const tweetRoutes = require('./routes/tweets.js') // see following code block

const app = express();

app.use('/users', userRoutes);
app.use('/tweets', tweetRoutes);

const port = 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
})
```
```js
// In a users route file
const express = require('express');

const router = express.Router();

router.get('/' (req, res) => {
  res.send('Hello from the base user route. We got here from /users/');
})

router.get('/:id' (req, res) => {
  res.send(`This is the page for user with id ${req.params.id}. We got here from /users/:id`);
})

// other routes, such as editing a profile, deleting a user, etc.

module.exports = router;
```

```js
// In a tweets route file
const express = require('express');

const router = express.Router();

router.get('/' (req, res) => {
  res.send('Hello from the base tweets route. We got here from /tweets/');
})

router.get('/:id' (req, res) => {
  res.send(`This is the page for tweet with id ${req.params.id}. We got here from /tweets/:id`);
})

// other routes, such as posting a tweet, editing, deleting, etc.

module.exports = router;
```

### Pug Templates
1. Declare HTML tags and their associated ids, classes, attributes, and content
- To declare a tag, we can use the name of the tag directly in the pug file.
- Nesting tags can be accomplished by indenting, with either spaces or tabs (just be consistent!)
- Ids and classes can be added by attaching them to the tag name, just like they are selected in a CSS file.
- Attributes can be given to a tag (like an href for an a tag, a src for an image, etc.) by supplying their values in parentheses:
```pug
html
  head
    title My Page
  body
    div#main
      div.blue
      div.yellow
        a(href="http://google.com") Click here
```

2. Use conditional statements to determine whether or not to render a block
- Inside of our Pug files we can include some logic, allowing our template to be even more dynamic.
- An `if` statement can be used with the condition directly following. Anything indented will only be included if the condition is true. We can similarly include an `else` as part of the condition:
```pug
if isEOD
  h2 Welcome back!
else
  h2 Keep coding!

if (time > 17)
  p See ya tomorrow!
```

3. Use interpolation to mix static text and dynamic values in content and attributes
- Whenever we want to interpolate a value inside our pug template's content, we can use the `#{}` syntax.
- It's important to distinguish this interpolation from JavaScript string interpolation. If we were to provide strings within this template that we needed to interpolate within, such as an href attribute, we are working with JavaScript at that point and would need to use our standard `${}` within backticks to interpolate those values:

```js
res.render('layout', {
  title: 'Pug demo page',
  header: 'interpolation',
  route: 'tweets'
})
```

```pug
html
  head
    title= title
    style
      include style.css
  body
    h1 Pug does #{header}
    h2 Pug allows you to do many things
    ul
      li: a(href='http://google.com') This is a link to google.com
      li: a(href=`http://mycoolsite.com/${route}`) This is a link to my cool site's #{route} route
```

4. Use iteration to generate multiple blocks of HTML based on data provided to the template
- We can iterate through variables within our pug templates using the `each ... in ...` syntax.
```js
// app.js
app.get('/pug', (req, res) => {
  res.render('eod', { colors: ['blue', 'red', 'green'] });
});
```

```pug
ul
  each color in colors
    li= color
```
