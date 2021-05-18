## What is Structured Exception Handling?
  - How we recover from errors in our code

## What mechanism does JavaScript use to implement SEH?
  - C, Go: Error or error code reporting
  - Common Lisp: Continuable exceptions
  - JavaScript, Python, and most modern languages: _stack unwinding_
	  - when an error occurs, the interpreter looks up the call stack for a handler for that error

## What code can we use to implement SEH?
	- try-catch blocks:
		- wrap code that may result in an error in a try block
		- if an error does happen, the catch block will capture it and run its code
	- finally blocks:
		- we can add a finally block to our try-catch for code that we want to run no matter what

## How can we make a custom error message?
	- throw Error('custom message')

## When should we use SEH? Why?
	- Use it sparingly. It checks to see if each line will throw an error, then continues executing.
	- Will slow down your code if used too much and also make it harder to read (extra nesting)
	- Use defensive code when possible
		- check for bad inputs and respond accordingly
		- `if (array === null || array === undefined) return undefined;`
	- Defensive code is more specific. try-catch will catch any error; something that we usually would only want at the top level of our application.

## What does npm mean? (Freebie!)
  - Node Package Manager

## Why use package management?
  - allows us to use code created by other developers as building blocks in our own project

## Two major parts of a package manager:
  - CLI: allows us to install packages into our project
  - Registry: a central location to house and pull packages from

## npm relies on three main files/directories:
  - package.json
		- JSON formatted metadata, including version, author, scripts, and the dependencies of our project
		- "package-name": "semantic.version.number"
			- package-name: tells npm what package to search for
			- semantic version number: specifies which version of the package to get
  - package-lock.json
		- actual record of packages being used (version, where it was downloaded from, etc.)
		- updated automatically whenever npm install is run - DO NOT UPDATE MANUALLY
  - node_modules
		- houses all of the code for packages that were installed with npm
		- allows us to use different versions of a package in different projects
		- can become very large; best practice to keep them out of version control since they can always be rebuilt

## Semantic Versioning Number
  - Three parts: major.minor.patch
    - Major: breaking, incompatible with other major versions, may require significant changes to interaction
		- Minor: new features, may require tweaks to interaction
		- Patch: bug fixes, generally shouldn't require changes to interaction
  - Version Ranges:
    - *: latest version
    - >1.0.0: any version above 1.0.0
    - ^1.0.0: any version in the 1.x.x range
    - ~1.0.0: any version in the 1.0.x range
    - 1.0.0: exactly version 1.0.0

## 'Using npm' readings

## Checking npm version
  - npm --version
	- npm -v

## Installing npm
  - npm install -g npm@latest

## Initializing a project with npm
  - npm init
	- npm init -y // uses defaults for all prompts

## Prompts for creating the package.json
  - These will be asked when you run the command. Default values will be assigned if you don't specify.
  - package name (name): The name that will be given to the package if it's published
  - version: Semantic version number (defaults to 1.0.0)
  - description: What's displayed in the npm registry
  - entry point (main): Specifies the main file of the app, generally what kicks off the program or where other files are imported into
  - test command: The name of the script to run tests for the project (defaults to 'test'). Testing functionality still needs to be created.
  - git repository: A link to the repository where the project lives.
  - keywords: Search terms in order to more easily find your package in the npm registry.
  - author: Your info to display on the npm registry page.
  - license: Defines what permissions others have with using your package. (Defaults to ISC, essentially free use with no responsibility taken. Provided "as is")

  ## Using the npm registry
    - npmjs.com
    - When choosing a package to use, consider:
      - Does it do what I need?
      - How popular is it?
      - Is it being maintained?

  ## Installing packages
    - Installing a dependency we'll need in production: 
      - npm install lodash
    - Installing a development-only dependency: 
      - npm install --save-dev nodemon

  ## Using a package in our code
    - Use a require statement at the top of our file
      ```javascript
        const moment = require('moment');

        // we can now use the methods in the moment package on the moment variable we just created
        console.log(moment.format('dddd'));
      ```

  ## Installing dependencies for an existing project
    - npm install

  ## Uninstalling dependencies
    - npm uninstall moment

  ## Updating dependencies
    - A single package:
      - npm update moment
      - updates the package that we have installed, up to the limit specified in our package.json
    - All packages in a project:
      - npm update

  ## Reinstall and change semver
    - npm install lodash@3.0.0

  ## Display security vulnerabilities
    - npm audit

  ## Addressing security vulnerabilities
    - If a major version upgrade is not needed:
      - npm audit fix
    - If a major version upgrade is needed:
      - npm audit fix --force
			- npm install lodash@latest

  ## Using scripts with npm
    - Defining scripts in package.json:
      - "scripts": {
					"watch": "nodemon index.js"
			}
    - Running scripts in the terminal:
      - npm run watch