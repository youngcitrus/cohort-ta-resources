## Class/Instance Variables in Python and SQLAlchemy (W18D3) - Learning Objectives

### Class and Instance Variables
1. Describe the difference between instance and class variables
- Instance variables are specific to each instance of the class.
- Class variables are shared across instances. Each instance points to the same class variables, so updating the value means each instance points to the same updated value.

2. Define a class variable
- A class variable is defined by assigning it at the top level of the class
```py
class Book:
  loan_duration = 14 # This is a class variable

  def __init__(self, title, series, author):
    # These are all instance variables
    self._title = title
    self._series = series
    self._author = author
    self._checked_out_on = None
```

3. Describe how Python performs attribute name lookups
- Python first looks for the instance variable with the name that we are referencing.
- If it is not found on the instance, it looks for a class variable with the name.
- If it is still not found, it throws an AttributeError
- Doing an assignment that uses a class variable name on an instance instead of the class will instead create an instance variable with the name. This means that the class variable will not be updated and future references to that name on the instance will point to the instance variable
```py
sorcerers_stone = Book("Harry Potter and the Sorcerer's Stone", "Harry Potter", "J.K. Rowling")

print(Book.loan_duration)             # 14
print(sorcerers_stone.loan_duration)  # 14

sorcerers_stone.loan_duration = 7
print(Book.loan_duration)             # 14
print(sorcerers_stone.loan_duration)  # 7
```

4. Understand the purpose of the `__slots__` class variable
- Adding a `__slots__` class variable does a couple of things for us:
    - It optimizes the creation of class instances by pre-allocating space in memory for each instance variable with a name listed in the `__slots__` list.
    - It also restricts us from creating any other instance variables that were not passed in to this list. This can be useful for preventing us from accidentally creating an instance variable when we meant to interact with a class variable of the same name.

```py
# Trying to add variable not listed in __slots__
class Person:
    __slots__ = ["name", "age"]
    def __init__(self, name, age):
        self.name = name
        self.age = age
p1 = Person("Bob Smith", 44)
p1.favorite_color = "red"  # AttributeError: 'Person' object has no attribute 'favorite_color'


# Adding a variable listed in __slots__ later on
class Person:
    __slots__ = ["name", "age", "favorite_color"]
    def __init__(self, name, age):
        self.name = name
        self.age = age
p1 = Person("Bob Smith", 44)
p1.favorite_color = "red"  # No error


# Adding a variable listed in __slots__ later on
class Person:
    __slots__ = ["name", "age"]
    favorite_color = "blue"
    def __init__(self, name, age):
        self.name = name
        self.age = age
p1 = Person("Bob Smith", 44)
print(Person.favorite_color)  # blue
print(p1.favorite_color)  # blue
p1.favorite_color = "red"  # AttributeError: 'Person' object attribute 'favorite_color' is read-only
Person.favorite_color = "red"  # No error
```

5. Describe the difference between instance, class, and static methods
- An instance method is invoked on an instance of a class. It takes in a reference to the instance implicitly (conventionally called `self` in the method definition).
- A class method is invoked on the class itself (can be invoked on an instance, but is not needed). It takes in a reference to the class implicitly (conventionally called `cls` in the method definition). It cannot reference instance methods or variables unless they are being called on an instance that was passed explicitly as an argument.
- A static method are similar to class methods, but they do not take in a reference to the class implicitly. They are typically used to perform some function on a collection of instances that are passed in as arguments (filter them in some way, invoke some method on them all, etc.)

6. Use the `@classmethod` decorator to define a class method
- The `@classmethod` decorator is used before the method definition inside the class, with `cls` being passed in as the first argument of the method:
```py
@classmethod
def create_series(cls, series, author, *args):
    """
    Factory class method for creating a series of books.
    """
    return [cls(title, series, author) for title in args]
```

7. Use the `@staticmethod` decorator to define a static method
- The `@staticmethod` decorator is used before the method definition inside the class. No implicit arguments need to be captured.
```py
@staticmethod
def get_titles(*args):
    """
    Static method that accepts a variable number
    of Book instances and returns a list of their titles.
    """
    return [book._title for book in args]
```

### SQLAlchemy
#### Connection SQLAlchemy to PostgreSQL
1. Describe how to create an "engine" that you will use to connect to a PostgreSQL database instance
- Import `create_engine` from `sqlalchemy`
  - `from sqlalchemy import create_engine`
- Construct the database url
  - `postgresql://<<username>>:<<password>>@<<server>>/<<database>>`
  - e.g. `db_url = postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test`
- Invoke `create_engine` with your url:
  - `engine = create_engine(db_url)`
- You should only make one engine for each database that you want to connect to

2. Describe how the `with engine.connect() as connection:` block establishes and cleans up a connection to the database
- Once we have our engine we can use `with engine.connect() as connection:` to set up a connection to our database.
- We can use `connection` within the block in order to execute SQL queries
- When we exit the block or an error occurs, the `with` keyword indicates that our context manager should run its `__exit__()` function, which in this case will close out our connection to the database.
- This block lets us avoid having to set up many `try`/`except`/`finally` blocks to make sure our connections are closed

3. Describe how to create a database session from an engine
- Import `sessionmaker` from `sqlalchemy.orm`
- Create a session factory by invoking the `sessionmaker` function with a `bind` kwarg set to your engine
- Create a session by invoking the session factory
```py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

db_url = "postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test"
engine = create_engine(db_url)

SessionFactory = sessionmaker(bind=engine)

session = SessionFactory()

# Do stuff with the session

engine.dispose()
```


#### SQLAlchemy Mappings
1. Create a mapping for SQLAlchemy to use to tie together a class and a table in the database
- Import the `declarative_base` function from `sqlalchemy.ext.declarative` and use it to create a `Base` class to base all of your other classes off of.
- Create a class with the name of the model we are trying to create that inherits from `Base`
- Create a class variable `__tablename__` equal to the name of the table in the database
- Import `Column` and `ForeignKey` from `sqlalchemy.schema` and any data types that you need for those columns from `sqlalchemy.types`
- Create class variables with the name of each column, setting them equal to the invocation of the `Column` function. Pass in to this function the data type. If the column is a primary key, pass in the kwarg `primary_key=True`. If the column is a foreign key, pass in `ForeignKey` invoked with the `<<table>>.<<column>>` that it links to.
- If your table has no associations, your model is complete and may look something like this:
```py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String

Base = declarative_base()


class Owner(Base):
    __tablename__ = "owners"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))
```
- To create a many-to-one relationship to another table, import `relationship` from `sqlalchemy.orm`
- Create a class variable with the name of the relationship you are creating. Set the variable equal to `relationship()` invoked with the name of class that it is being associated to as well as a `back_populates` kwarg with the name of the relationship from the opposite end. `back_populates` ensures that if we affect one side of the association, the other side is also affected.
```py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey
from sqlalchemy.types import Integer, String

Base = declarative_base()


class Owner(Base):
    __tablename__ = "owners"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    ponies = relationship("Pony", back_populates="owner")


class Pony(Base):
    __tablename__ = "ponies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    birth_year = Column(Integer)
    breed = Column(String(255))
    owner_id = Column(Integer, ForeignKey("owners.id"))

    owner = relationship("Owner", back_populates="ponies")
```
- To create a many-to-many relationship, add `Table` to your imports from `sqlalchemy.schema`. This will be used to tell SQLAlchemy about the join table that our database is using to connect our two models. We don't need to create a model just for the join, since it doesn't actually represent anything of substance that we need to interact with directly.
- Create an instance of the `Table` class with the name of the join table. Pass in to the constructor of this instance the name of the join table, the `Base.metadata` from the `Base` that we are using as a parent for all of our models, and the columns for each foreign key on the join table.
- To utilize this join table in our relationships, we use the same `relationship` function that we used for our many-to-one associations, but we add in another kwarg, `secondary`, that points to the `Table` instance we just created
```py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column, ForeignKey, Table
from sqlalchemy.types import Integer, String

Base = declarative_base()

pony_handlers = Table(
    "pony_handlers",
    Base.metadata,
    Column("pony_id", ForeignKey("ponies.id"), primary_key=True),
    Column("handler_id", ForeignKey("handlers.id"), primary_key=True))

# Owner declaration...

class Pony(Base):
    __tablename__ = "ponies"

    id = Column(Integer, primary_key=True)
    name = Column(String(255))
    birth_year = Column(Integer)
    breed = Column(String(255))
    owner_id = Column(Integer, ForeignKey("owners.id"))

    owner = relationship("Owner", back_populates="ponies")
    handlers = relationship("Handler",
                            secondary=pony_handlers,
                            back_populates="ponies")


class Handler(Base):
    __tablename__ = "handlers"

    id = Column(Integer, primary_key=True)
    first_name = Column(String(50))
    last_name = Column(String(50))
    employee_id = Column(String(12))

    ponies = relationship("Pony",
                          secondary=pony_handlers,
                          back_populates="handlers")
```

#### Create, Update, and Delete with SQLAlchemy
1. Add data to the database, both single entities as well as related data
- To create a new record in the database, we first create a new instance of the model class. If the model has associated entities we can pass the related entity directly as the relationship instead of having to pass a foreign key.
```py
you = Owner(first_name="your first name",
            last_name="your last name",
            email="your email")

your_pony = Pony(name="your pony's name",
                 birth_year=2020,
                 breed="whatever you want",
                 owner=you)
```
- In order to save the records to the database, we add the instances to the session, then commit our additions.
```py
session.add(you)      # Connects you and your_pony objects
session.commit()      # Saves data to the database
```
- We only had to add `you` to the session because our relationships by default are added in to be updated on save (part of the default values for `cascade`, discussed below).

2. Update data in the database
- When we have a reference to an instance of a model, we can change the values of its attributes, then commit out changes.
```py
print(your_pony.birth_year)    # > 2020
your_pony.birth_year = 2019
print(your_pony.birth_year)    # > 2019
session.commit()
```

3. Delete data from the database (including cascades!)
- We can delete a record by passing a reference to the model instance to the `delete` method of the session, then committing our changes
```py
session.delete(you)
session.commit()
```
- If the record that we are trying to delete is associated with another record, one of two things will occur:
  - If the foreign key is allowed to be null in the associated table, our record will be deleted and the associated foreign key will be set to null.
  - If the foreign key is required in the associated table, SQLAlchemy will raise an IntegrityError
- In order for use to automatically delete an associated record that depended on us as a foreign key, we need to specify this functionality in the `cascade` kwarg of our relationship, discussed below.

4. Know how to use and specify the "delete-orphan" cascading strategy
- To allow for deleting a record triggering the deletion of associated records that depended on it instead of raising IntegrityErrors, we can provide a new value to the `cascade` kwarg while defining our relationship.
- By specifying `cascade="all, delete-orphan"` as an argument to our `relationship`, we tell SQLAlchemy to delete the associated record when we delete this one:
```py
class Owner(Base):
    __tablename__ = 'owners'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    # When we delete this owner, we also delete the associated ponies that were owned
    ponies = relationship("Pony",
                          back_populates="owner",
                          cascade="all, delete-orphan")
```

5. One helpful thing to note is that we can `rollback` changes to our records to our previous commit, or to what it is in the database if no previous commit exists:
```py
print(your_pony.birth_year)    # > 2020
your_pony.birth_year = 2019

session.commit()

print(your_pony.birth_year)    # > 2019

your_pony.name = "Mr. Fancy Pants"
your_pony.birth_year = 1896
print(your_pony.name)          # > Mr. Fancy Pants
print(your_pony.birth_year)    # > 1896

session.rollback()
print(your_pony.name)          # > your pony's original name
print(your_pony.birth_year)    # > 2019
```

#### Querying Data with SQLAlchemy
1. Describe the purpose of a `Query` object
- The query object allows us to build up a SQL query by applying filters at runtime.
- The query object that we create simply specifies the `SELECT` and `FROM` clauses of a SQL query. The query is not executed until we invoke a method to receive the results, such as `all()`, `first()`, `one()`, or `one_or_none()`, discussed below (#5)

2. Use a `Session` object to query the database using a model
- Using the `query` function on our `session`, we can pass in a reference to our model in order to set up the base of a query that retrieves all fields from the table:
```py
pony_query = session.query(Pony)

print(pony_query)
# Prints the associated SQL query:
# SELECT ponies.id AS ponies_id,
#        ponies.name AS ponies_name,
#        ponies.birth_year AS ponies_birth_year,
#        ponies.breed AS ponies_breed,
#        ponies.owner_id AS ponies_owner_id
# FROM ponies
```
- If we do not want all of our attributes returned, we can specify what exactly we want in our query arguments:
```py
owner_query = session.query(Owner.first_name, Owner.last_name)
print(owner_query)
# Prints the associated SQL query:
# SELECT owners.first_name AS owners_first_name,
#        owners.last_name AS owners_last_name
# FROM owners
```
- We can get a reference to a record in our database by primary key using the `get` method on our query, passing in the primary key
```py
pony_id_3_query = session.query(Pony).get(3)
print(pony_id_3_query.breed) # Hirzai
```

3. How to order your results
- To order our results, we can tack on an `order_by(<<attribute>>)` to our query
```py
# Default ascending ordering
owner_query = session.query(Owner.first_name, Owner.last_name)
                     .order_by(Owner.last_name)
# OR descending
owner_query = session.query(Owner.first_name, Owner.last_name)
                     .order_by(Owner.last_name.desc())
```

4. Use the `filter` method to find just what you want
- We can add a `filter(<<attribute>> <<filter operation>> <<value>>)` on to our query to filter the results.
- Common operations include:

| Comparison | Description                  | Example                                                 |
|:---------- |:---------------------------- |:------------------------------------------------------- |
| `==`       | Equal to                     | `.filter(Pony.name == "Lucky Loser")`                   |
| `!=`       | Not equal to                 | `.filter(Pony.name != "Lucky Loser")`                   |
| `>`, `>=`  | Greater than (or equal to)   | `.filter(Pony.birth_year < 2019`                        |
| `<`, `<=`  | Less than (or equal to)      | `.filter(Pony.birth_year > 2010`                        |
| `.like`    | Like                         | `.filter(Pony.name.like("Lucky%"))`                     |
| `.ilike`   | Case-insensitive like        | `.filter(Pony.name.like("lucky%"))`                     |
| `.in_`     | Value in a list              | `.filter(Pony.age.in_([2018, 2019, 2020]))`             |
| `.notin_`  | Value not in a list          | `.filter(Pony.age.notin_([2018, 2019, 2020]))`          |
| `.is_`     | Comparison for `IS NULL`     | `.filter(Pony.name.is_(None))`                          |
| `.isnot_`  | Comparison for `IS NOT NULL` | `.filter(Pony.name.isnot_(None))`                       |
| `.or_`     | `OR` together filters        | `.filter(or_(Pony.name == "Bob", Pony.name == "Blob"))` |

- For example:
```py
pony_query = session.query(Pony)
                    .filter(Pony.name.ilike("%u%"))
                    .filter(Pony.birth_year < 2015)
```

5. Use instance methods on the `Query` object to return a list or single item
- The four most common methods we use to execute a query and return records are
  - all: returns a list of all records that match the query
  - first: returns the first record that matches the query as an instance of the model
  - one: returns the single record that matches the query as an instance of the model. If zero or more than one record matches, an exception is raised
  - one_or_none: returns the single record that matches the query as an instance of the model, or None if there were no matches. If more than one record matches, an exception is raised
- For example:
```py
ponies = pony_query.all()
for pony in ponies:
    print(pony.name)

# Using the query as an iterator will automatically trigger all() as well
for pony in pony_query:  # Implicit call to .all()
    print(pony.name)
```

6. Use the `count` method to ... count
- We can invoke `count()` on a query to return the number of matching records instead of records themselves
```py
pony_query = session.query(Pony).filter(Pony.name.ilike("%u%"))
print(pony_query.count())
```

#### Querying Across Joins in SQLAlchemy
1. Query objects with criteria on dependant objects
- In order to filter a query based on related data, we can join the relation on the query before filtering
```py
# Returns all Owner records that own a Pony with breed 'Hirzai'
hirzai_owners = session.query(Owner) \
                       .join(Pony)  \
                       .filter(Pony.breed == "Hirzai")                      
```

2. Lazily load objects
- When we have an instance of a model, we can get the associated records' data as well by accessing its attributes.
- We generate a new query to get the extra data each time we try to access an associated record
```py
for owner in session.query(Owner):
    print(owner.first_name, owner.last_name)
    for pony in owner.ponies:
        print("\t", pony.name)
# Four queries are executed:
#   - getting the owners
#   - for each of the three owners returned, getting the associated ponies
```

3. Eagerly load objects
- To combine our queries, we can use the `joinedload` function from the `sqlalchemy.orm` module.
- We create a new query that joins the two tables by invoking `options(joinedload(<<model>>.<<association>>))` on our query:
```py
from sqlalchemy.orm import joinedload

owners_and_ponies = session.query(Owner).options(joinedload(Owner.ponies))
for owner in owners_and_ponies:
    print(owner.first_name, owner.last_name)
    for pony in owner.ponies:
        print("\t", pony.name)
```

#### Using SQLAlchemy with Flask
1. Install the Flask-SQLAlchemy extension to use with Flask
- Use `pipenv` to install `Flask-SQLAlchemy`
```bash
# Adding to existing project
pipenv install Flask-SQLAlchemy

# Starting a new project
pipenv install Flask psycopg2-binary SQLAlchemy \
               Flask-SQLAlchemy \
               --python "$PYENV_ROOT/versions/«version»/bin/python"
```

2. Configure SQLAlchemy using `Flask-SQLAlchemy`
- To configure SQLAlchemy with `Flask-SQLAlchemy`, we add the key `SQLALCHEMY_DATABASE_URI` to our `app.config` dictionary.
- This key uses the standard database connection url we are used to:
  - `postgresql://<<username>>:<<password>>@<<server>>/<<database>>`
- If we are following our standard configuration steps, we can simply add this key in to our `Configuration` class:
```py
# config.py
class Configuration():
    SECRET_KEY = 'asdf'
    SQLALCHEMY_DATABASE_URI = 'postgresql://sqlalchemy_test:password@localhost/sqlalchemy_test'


# app's __init__.py, or wherever our Flask app is made
from .config import Configuration
app = Flask(__name__)
app.config.from_object(Configuration)
```

3. Use the convenience functions and objects `Flask-SQLAlchemy` provides you to use in your code.
- We no longer need to make an engine, instead creating a SQLAlchemy object, passing in our Flask app:
```py
from config import Config
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
```
- Instead of creating a `Base` class, we can use the `db.Model` attribute, which wraps up a generated instance for us. All of our data types and the `Column`, `relationship`, `ForeignKey`, etc., functions are also added to `db` for our convenience in model mapping, saving us from having to import them. Using `db.Model` as the base will also automatically try to convert our class name into a `__tablename__` for us, but we can still specify it if we'd like:
```py
# With our convenience attributes from using Flask-SQLAlchemy
from app import db

class Owner(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Columndb.(String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255))

    ponies = db.relationship("Pony", back_populate="owner")


# Without these convenience attributes
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.schema import Column
from sqlalchemy.types import Integer, String

Base = declarative_base()

class Owner(Base):
    __tablename__ = 'owners'

    id = Column(Integer, primary_key=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))

    ponies = relationship("Pony", back_populates="owner")
```
- Flask-SQLAlchemy adds a `query` method directly to the model instead of having to interact with a session:
  - `pony = Pony.query.get(4)`
- When using these queries in a route, we can easily return a 404 if our data was not found by using either `get_or_404` or `first_or_404` methods on the query:
```py
@app.route("/pony/<int:id>", method=["GET"])
def show_pony(id):
    pony = Pony.query.get_or_404(id)
    return jsonify(pony)
```
- Flask-SQLAlchemy automatically makes a `Session` instance for us on each request. We can access this session in order to add, delete, and/or commit by keying in to `db.session`:
```py
@app.route("/pony/<int:id>", method=["PUT"])
def update_pony(id):
    pony = Pony.query.get(id)
    for key, value in request.form:
        setattr(pony, key, value)
    db.session.commit()


@app.route("/pony/<int:id>", method=["DELETE"])
def delete_pony(id):
    pony = Pony.query.get(id)
    db.session.delete(pony)
    db.session.commit()
```
