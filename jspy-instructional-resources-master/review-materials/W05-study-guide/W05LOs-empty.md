# Week 5 Learning Objectives

## NPM
  1. Explain what "npm" stands for.

  2. Explain the purpose of the package.json file and node_modules directory.

  3. Given multiple choices, identify the difference between npm's package.json and package-lock.json files.

  4. Use npm --version to check what version is currently installed and use npm to update itself to the latest version.

  5. Use npm init to create a new package and npm install to add a package as a dependency. Then use require to import the module and utilize it in a JavaScript file.

  6. Given a package version number following the MAJOR.MINOR.PATCH semantic versioning spec that may include tilde (~) and caret (^) ranges, identify the range of versions of the package that will be compatible.

  7. Explain the difference between a dependency and a development dependency.

  8. Given an existing GitHub repository, clone the repo and use npm to install it's dependencies.
  
  9. Use npm uninstall to remove a dependency.
  
  10. Use npm update to update an out-of-date dependency.
  
  11. Given a problem description, use the npm registry to find a reputable package (by popularity and quality stats) that provides functionality to solve that problem.
  
  12. Given a package with vulnerabilities due to outdated dependency versions, use npm audit to scan and fix any vulnerabilities.
  
  13. Write and run an npm script.
  
## JavaScript Classes
  1. Define a constructor function using ES5 syntax.
  
  2. Define a method on the prototype of a constructor function.

  3. Declare a class using ES6 syntax.

  4. Define an instance method on a class (ES6).
  
  5. Define a static method on a class (ES6).
  
  6. Instantiate an instance of a class using the new keyword.
  
  7. Implement inheritance using the ES6 extends syntax for an ES6 class.
  
  8. Utilize the super keyword in a child class to inherit from a parent class.
  
  9. Utilize module.exports and require to import and export functions and class from one file to another.

## Object-Oriented Programming
  1. The three pillars of object-oriented programming
  
  2. The SOLID principles
    - What does each letter stand for?
    - We talked about the S and L in more depth; know how to apply them and what they mean for us in JavaScript
  
  3. How to apply the Law of Demeter
  

## Assessment Format
  - Multiple Choice x10
  - Online Coding Environment x2
  - VSCode Questions
    - Four .js files that you'll have to code in
    - Pass the mocha specs for each file (17 specs total)
    - We will use CommonJS for requiring/exporting files
      - We will use `module.exports = ClassName`, `module.exports = { ClassName }`, or `exports.ClassName = ClassName` for exporting. Know the differences and how to use each.
      - We will use `const ClassName = require('./file/path')` or `const { ClassName } = require('./file/path')` for importing. Know the differences and how to use each.
    - ES Modules import/export syntax (like what is used in Connect Four) is important for you to know moving forward in the curriculum; it is what allows us to import files in a browser environment. However, you will not be writing it on the assessment as we will only be running specs in a Node environment, where CommonJS is still the default.
      - Fun fact: ES Modules are an experimental feature in Node. Maybe one day they'll take over as the default! :fingers-crossed: