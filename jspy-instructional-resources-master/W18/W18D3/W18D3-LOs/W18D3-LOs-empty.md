## Class/Instance Variables in Python and SQLAlchemy (W18D3) - Learning Objectives

### Class and Instance Variables
1. Describe the difference between instance and class variables
2. Define a class variable
3. Describe how Python performs attribute name lookups
4. Understand the purpose of the `__slots__` class variable
5. Describe the difference between instance, class, and static methods
6. Use the `@classmethod` decorator to define a class method
7. Use the `@staticmethod` decorator to define a static method

### SQLAlchemy
#### Connection SQLAlchemy to PostgreSQL
1. Describe how to create an "engine" that you will use to connect to a PostgreSQL database instance
2. Describe how the `with engine.connect() as connection:` block establishes and cleans up a connection to the database
3. Describe how to create a database session from an engine

#### SQLAlchemy Mappings
1. Create a mapping for SQLAlchemy to use to tie together a class and a table in the database

#### Create, Update, and Delete with SQLAlchemy
1. Add data to the database, both single entities as well as related data
2. Update data in the database
3. Delete data from the database (including cascades!)
4. Know how to use and specify the "delete-orphan" cascading strategy

#### Querying Data with SQLAlchemy
1. Describe the purpose of a `Query` object
2. Use a `Session` object to query the database using a model
3. How to order your results
4. Use the `filter` method to find just what you want
5. Use instance methods on the `Query` object to return a list or single item
6. Use the `count` method to ... count

#### Querying Across Joins in SQLAlchemy
1. Query objects with criteria on dependant objects
2. Lazily load objects
3. Eagerly load objects

#### Using SQLAlchemy with Flask
1. Install the Flask-SQLAlchemy extension to use with Flask
2. Configure SQLAlchemy using `Flask-SQLAlchemy`
3. Use the convenience functions and objects `Flask-SQLAlchemy` provides you to use in your code.