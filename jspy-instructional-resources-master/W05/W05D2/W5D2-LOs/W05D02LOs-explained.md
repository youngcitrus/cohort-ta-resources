## JavaScript Classes
  1. Define a constructor function using ES5 syntax.
    ```javascript
    function Book(title, series, author) {
      this.title = title;
      this.series = series;
      this.author = author;
    }
    ```
  
  2. Define a method on the prototype of a constructor function.
    ```javascript
    Book.prototype.getInformation = function () {
      if (this.series) {
        return `${this.title} (${this.series})`;
      } else {
        return this.title;
      }
    }
    ```

  3. Declare a class using ES6 syntax.
    ```javascript
    class Book {
      constructor(title, series, author) {
        this.title = title;
        this.series = series;
        this.author = author;
      }
    }
    ```

  4. Define an instance method on a class (ES6).
    ```javascript
    class Book {
      // constructor

      getInformation() {
        if (this.series) {
          return `${this.title} (${this.series})`;
        } else {
          return this.title;
        }
      }
    }
    ```
  
  5. Define a static method on a class (ES6).
    ```javascript
    class Book {
      // constructor

      static getUniqueAuthors(...books) {
        let authors = [];
        books.forEach(book => {
          if (!authors.includes(book.author)) {
            authors.push(book.author)
          }
        })
        return authors;
      }
    }
    ```
  
  6. Instantiate an instance of a class using the new keyword.
    ```javascript
    const theGrapesOfWrath = new Book('The Grapes of Wrath', null, 'John Steinbeck');
    ```
  
  7. Implement inheritance using the ES6 extends syntax for an ES6 class.
    ```javascript
    class Book extends CatalogItem {
      // Book code
    }
    ```
  
  8. Utilize the super keyword in a child class to inherit from a parent class.
    ```javascript
    class CatalogItem {
      constructor(title, series) {
        this.title = title;
        this.series = series;
      }

      getInformation() {
        if (this.series) {
          return `${this.title} (${this.series})`;
        } else {
          return this.title;
        }
      }
    }

    class Book extends CatalogItem {
      constructor(title, series, author) {
        super(title, series);
        this.author = author;
      }
    }

    class Movie extends CatalogItem {
      constructor(title, series, director) {
        super(title, series);
        this.director = director;
      }

      // extending the functionality of the parent's getInformation()
      getInformation() {
        let result = super.getInformation();
        if (this.director) {
          result += ` [directed by ${this.director}]`;
        }
        return result;
      }
    }
    
    ```
  
  9. Utilize module.exports and require to import and export functions and class from one file to another.
    - In this first example, we are exporting a single item from each file. We are assigning that item to module.exports directly.
    ```javascript
    // catalog-item.js

    class CatalogItem {
      // CatalogItem code
    }

    module.exports = CatalogItem
    ```
    ```javascript
    // book.js

    const CatalogItem = require('./catalog-item');

    class Book extends CatalogItem {
      // Book code
    }

    module.exports = Book
    ```
    - In this next example, we are exporting a multiple items from a file. We are assigning an object to module.exports that contains each item we are exporting. When we import from this file, we can either import the whole object, or destructure right in our import
    ```javascript
    // classes.js

    class CatalogItem {
      // CatalogItem code
    }

    class Book extends CatalogItem {
      // Book code
    }

    class Movie extends CatalogItem {
      // Movie code
    }

    module.exports = { Book, Movie}
    ```
    ```javascript
    // index.js

    const classes = require('./classes');
    const Movie = classes.Movie;
    const Book = classes.Book;

    // Or, destructuring in the import statment:
    // const { Movie, Book } = require('./classes');

    const theGrapesOfWrath = new Book('The Grapes of Wrath', null, 'John Steinbeck');
    const aNewHope = new Movie('Episode 4: A New Hope', 'Star Wars', 'George Lucas');
    ```
    