## Environments and Environment Variables

### What is an environment?
- Where your code exists and is running.
- We can have different environments which would require us to interact with our application in different ways.
  - Development/Local: Where we are creating our application, default environment for interacting with our app in Node.
  - Testing: Used to test the application. Tests that we write will mock data or scenarios that we want to be able to handle.
  - Staging: Very similar to production, allows us to see our application in a near-production environment.
  - Production: The "live" version of our application, what the end-user is interacting with.

### Why use environment variables?
- Something that changes depending on the environment that we are in.
- Common use cases would be for us to define database names, username/password combos for the db, api keys, etc., that are going to change based on how the app is run.

### Using the command line for environment variables
- When using node, we can create an environment variable by declaring it before the node command:
  - `PORT=8080 NODE_ENV=development node app.js`
- The same concept applies to scripts that we create, since invoking a script is running the associated command:
```json
{
  "scripts": {
    "start": "PORT=8080 NODE_ENV=development node app.js"
  }
}
```

### Accessing environment variables
- In our application, we can access environment variables that have been created by using `process.env.VARIABLE_NAME` (It is standard practice to use all capitalized snake-case for environment variable names)
```js
// If no PORT environment variable exists, default to 8080
const port = process.env.PORT || 8080;
```

### Using a `.env` file
- Having one location to define all of your environment variables can be convenient for organization as well as makes our terminal commands more streamlined.
- A `.env` file is created at the root of our project. This file keeps environment variable declarations on individual lines:
```
PORT=8080
DB_USERNAME=mydbuser
DB_PASSWORD=mydbuserpassword
DB_DATABASE=mydbname
DB_HOST=localhost
```
- Adding the `dotenv` package to our application allows us to source the `.env` file and make the variables available to us on `process.env` just as if they were declared in the command line. We can use this package in two ways:
  1. In our app, require the `dotenv` package and invoke the `config()` method. Doing this at the very beginning of the application makes the variables available throughout.
  ```javascript
  require('dotenv').config();
  // After this line we can reference process.env.VARIABLE_NAME for anything declared in our .env file
  ```
  2. When we run node either directly in the terminal or when we make our script to do so, we can use the `-r` flag, which requires a module at the start of the app. Requiring `dotenv/config` gives us the same functionality as requiring and invoking this method in the actual JavaScript:
  ```json
  {
    "scripts": {
      "start": "node -r dotenv/config app.js"
    }
  }
  ```

### Source control and environment variables
- Since environment variables generally contain sensitive information, like database connection strings with username/password combos, we typically keep them out of source control.
- `.env` should be added to your `.gitignore` so that you don't push these files up to a remote repository. When working on a team, these variables are generally shared through other means and `.env` files will have to be created by the developers when they pull a project from a remote repository.
- We can create a `.env.example` file which shows all of the variable names we are using throughout the app with dummy values given. This makes sure that other developers know what all they need to provide in the `.env` file that they create.

### Reorganization of variables into modules
- A common organizational tool you will encounter is creating module that encapsulates all of your environment variables and exports them.
- This encapsulation allows us to reorganize, rename, or set default values for each variable all in one location.
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
- Instead of referencing `process.env.VARIABLE_NAME` throughout the application, we can instead require this new module that we created and key into whichever field we are concerned with.

### npm Binaries and environment variables
- We've seen cases where we had to execute a binary using `npx` in order to run a file that interacts with our application. Most recently we've had to run `npx sequelize db:migrate` (and other sequelize commands) in order to interact with our database.
- In order for us to load our environment variables to be usable with these binaries, we can add the `dotenv-cli` package and prepend the `dotenv` command to whatever we are trying to execute.
  - `npm install dotenv-cli --save-dev`
  - `npx dotenv sequelize db:migrate`
  - `npx sequelize model:generate` (This command doesn't need dotenv because it doesn't use environment variables. It wouldn't hurt it if it was added, just not necessary.)
- By prepending `sequelize` with `dotenv` we have access to the environment variables defined in `.env`, which most likely contain the database name and username/password combo.

### per-env package and environment-based scripts
- We will often want to run different scripts based on our environment. A common example would be in development, starting our app with `nodemon` instead of `node` allows for developing without constant manual server refreshes. In production, we won't be making changes to our server code, so the extra weight of `nodemon` is not needed (we probably won't even have the `nodemon` package in our production environment). In that case we, just want to start our app with `node`.
- By adding the `per-env` package to our application, we can create scripts with the same name and add on the environment that each version should run in. This allows us to run `npm start` for example and have different scripts be run for development and production.
- ` npm install per-env`
```json
{
  "scripts": {
    "start": "per-env",
    "start:development": "nodemon app.js",
    "start:production": "node app.js",
  }
}
```
