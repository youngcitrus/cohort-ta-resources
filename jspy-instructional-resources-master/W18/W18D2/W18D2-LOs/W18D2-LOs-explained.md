## Decorators, Psycopg, and Flask (W18D2) Learning Objectives

### Decorators
1. Be able to explain what a Python decorator is
- A function that takes in another function to extend its behavior and return a modified version of the inner function

2. Understand how callbacks and closures are connected to Python decorators
- With callbacks, we can pass around and return references to functions to be invoked at a later time. This concept holds with Python's decorators, where we are defining and returning a reference to a new function to be invoked later on.
- With closures, we have access to variables defined in outer scopes, allowing us to define inner functions that utilize variables passed in to outer functions. In decorators, our inner functions have access to the callbacks passed in as arguments to the outer decorator function.
```py
# message_decorator is our decorator function
# message_func is the callback, a function that we are decorating
# We are closing over this function, returning a reference to a new function (message_wrapper)
# This new function is able to invoke message_func because it was closed over, defined in the outer scope
def message_decorator(message_func):
  def message_wrapper(name):
    from_statement = 'This is a message from ' + name
    print(message_func() + from_statement)
  return message_wrapper
```

3. Know how to define custom decorator functions with and without syntactic sugar
- A decorator function takes in a function as an argument that we want to wrap, then returns a new function that performs whatever additional functionality we want the decorated function to do.
- To decorate a function and maintain the name, we can reassign its value after decorating:
```py
# decorator function
def message_decorator(message_func):
  def message_wrapper(name):
    from_statement = 'This is a message from ' + name
    print(message_func() + from_statement)
  return message_wrapper

# function to decorate
def say_hi():
    return 'Hi! '

# before decorating
say_hi() # returns 'Hi! '

# decorated function
say_hi = message_decorator(say_hi)

# say_hi now points to the wrapped function and will expect a 'name' argument
say_hi('Bryce') # prints 'Hi! This is a message from Bryce'
```
- We can also use the `@<<decorator_name>>` syntactic sugar to reassign a function at definition:
```py
# decorator function
def message_decorator(message_func):
  def message_wrapper(name):
    from_statement = 'This is a message from ' + name
    print(message_func() + from_statement)
  return message_wrapper

# immediately decorated function
@message_decorator
def say_hi():
    return 'Hi! '

# say_hi will immediately expect a name argument
say_hi('Bakari') # prints 'Hi! This is a message from Bakari'

# decorators are especially useful when we decorate multiple functions
@message_decorator
def say_bye():
    return 'Bye! '

say_hi('Alvin') # prints 'Bye! This is a message from Alvin'
say_bye('Alvin') # prints 'Hi! This is a message from Alvin'
```

4. Understand how to use `@property`, a built-in class decorator
- We've already used this decorator when we learned about classes.
- It provides the name of the function that we are decorating as an attribute on our class, returning the value of the instance variable we are returning.
- We can use the `@<<attribute_name>>.setter` decorator to allow our attribute to also be assigned new values.
- The decorator `@<<attribute_name>>.deleter` decorator allows us to `del` the attribute, completely removing the instance variable. Trying to reference the variable either directly or through a getter will result in an AttributeError if the deleter has been invoked. A setter could still recreate the instance variable.
```py
class Ring:
  def __init__(self):
    self._nickname = "Shiny ring"

  @property
  def nickname(self):
    return self._nickname

  @nickname.setter
  def nickname(self, value):
    self._nickname = value

  @nickname.deleter
  def nickname(self):
    del self._nickname
    print('Oh no! The ring is gone!')

ring = Ring()
print(ring.nickname)                  # Shiny ring
ring.nickname = "Gollum's precious"
print(ring.nickname)                  # Gollum's precious
del ring.nickname                     # Oh no! The ring is gone!

print(ring._nickname)                 # AttributeError: 'Ring' object has no attribute '_nickname'
print(ring.nickname)                  # AttributeError: 'Ring' object has no attribute '_nickn
# (1995, 'Mitsubishi', 'Eclipse', 2)
# (1994, 'Acura', 'Integra', 3)

# (Assuming the previous two lines weren't run and we didn't error out)
ring.nickname = "Shiny ring"
print(ring.nickname)                  # Shiny ring
```

5. Know how to use `*args` and `**kwargs` to manage decorator arguments
- We can use `*args` and `**kwargs` in our wrapped function just like any other function definition in order to capture any arguments passed in to our decorated function.
```py
def message_decorator(message_func):
  def message_wrapper(*args, **kwargs):
    repeats = args[0]
    message = message_func(kwargs['name'])
    author = kwargs['author']
    for i in range(repeats):
        print(f'{message}! This is a message from {author}.')
  return message_wrapper

@message_decorator
def say_hi(name):
  return f'Hi, {name}'

# say_hi points to the wrapper function, so the arguments are passed directly to that function definition
# (2) is passed to *args and { name: 'Julia', author: 'Ryan' } is passed to **kwargs
say_hi(2, name='Julia', author='Ryan')  # Prints 'Hi, Julia! This is a message from Ryan.' twice.
```

6. Recognize popular decorator libraries
- Many decorator libraries exist that define decorators that you may find useful. Two examples are:
    - functools: https://docs.python.org/3/library/functools.html
    - PythonDecoratorLibrary: https://wiki.python.org/moin/PythonDecoratorLibrary 


### Psycopg
1. Connect to a PostgreSQL RDBMS using Psycopg
- Add `psycopg2-binary` to your pipenv
  - `pipenv install psycopg2-binary`
  - If you are creating the virtualenv instead of adding to an existing one, you can also specify which version of Python you want the environment to use:
    - `pipenv --python 3.8.2 install psycopg2-binary`
- Import the `psycopg2` package into your module
  - `import psycopg2`
- Set up your connection parameters in a dictionary, including `dbname`, `user`, and `password`:
```py
CONNECTION_PARAMETERS = {
                          'dbname': 'psycopg_test_db',
                          'user': 'psycopg_test_user',
                          'password': 'password',
}
```
- Using `with` (discussed below), open a connection to the database. We can use the `connect` method on `psycopg2` and spread our connection parameters:
```py
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
  # Do something with our connection (probably open a cursor first)
```

2. Open a "cursor" to perform data operations
- After we've made our connection to the database, use the `cursor` method on the connection:
```py
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      # Do something with our cursor
```
- With our cursor, we can use the `execute` method to run a SQL command:
```py
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
        curs.execute('DROP TABLE cars;')
```

3. Use results performed from executing a `SELECT` statement on existing database entities
- After executing a command, we can fetch the results using the `fetchone` or `fetchall` methods on the cursor.
- `fetchone` will return a tuple of the first matched record
- `fetchall` will return a list of tuples of all matching records
```py
# Fetching one record (find owner info by email):
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
        curs.execute("""
                      SELECT first_name, last_name, email
                      FROM owners
                      WHERE email = %(email)s
                      """,
                      {'email': email})
        results = curs.fetchone()
        return results

# Fetching many records (find cars by owner_id):
with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
        curs.execute("""
                      SELECT manu_year, make, model, owner_id
                      FROM cars
                      WHERE owner_id = %(owner_id)s
                      """,
                      {'owner_id': owner_id})
        results = curs.fetchall()
        return results
```

4. Use parameterized SQL statements to insert, select, update, and delete data
- We can interpolate data into our SQL query strings in order to make them more dynamic. This allows us to create functions for our repeated actions:
```py
# Inserting a new record
def add_new_car(manu_year, make, model, owner_id):
  """
  Add the given car to the database
  :param manu_year: <int> the year the car was made
  :param make: <string> the manufacturer of the car
  :param model: <string> the model of the car
  :param owner_id: <int> the id number of the owner
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      # curs.execute(f'INSERT INTO {table}{columns} VALUES{values};')
      curs.execute("""
                    INSERT INTO cars (manu_year, make, model, owner_id)
                    VALUES (%(manu_year)s, %(make)s, %(model)s, %(owner_id)s)
                    """,
                    {'manu_year': manu_year,
                    'make': make,
                    'model': model,
                    'owner_id': owner_id})


# Updating an existing record
def change_car_owner(car_id, new_owner_id):
  """
  Update the owner of a car, both by record id
  :param car_id: <int> the id of the car to change
  :param new_owner_id: <int> the owner_id to give ownership to
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      curs.execute("""
                    UPDATE cars SET owner_id = %(new_owner_id)s
                    WHERE id = %(car_id)s
                    """,
                    {'car_id': car_id,
                    'new_owner_id': new_owner_id})


# Deleting a record
def delete_car(car_id):
  """
  Delete the record for a car given an id for that car
  :param car_id: <int> the id of the car record to remove
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      curs.execute("""
                    DELETE FROM cars WHERE id = %(car_id)s
                    """,
                    {'car_id': car_id})


# Selecting records
def get_owners_cars(owner_id):
  """
  Fetch and return all cars in the cars table
  :param owner_id: <int> the id of the owner who's cars to return
  :return: <list> the results of the query
  """
  with psycopg2.connect(**CONNECTION_PARAMETERS) as conn:
    with conn.cursor() as curs:
      curs.execute("""
                    SELECT manu_year, make, model, owner_id 
                    FROM cars
                    WHERE owner_id = %(owner_id)s
                    """,
                    {'owner_id': owner_id})
      results = curs.fetchall()
      return results
```

5. Specify what type Psycopg will convert the following PostgreSQL types into:

| PostgreSQL type | Python type               |
|:--------------- |:------------------------- |
| NULL            | None                      |
| bool            | bool                      |
| double          | float                     |
| integer         | int (long in Python 2)    |
| varchar         | str                       |
| text            | str (unicode in Python 2) |
| date            | date                      |

6. Use the `with` keyword to clean up connections and database cursors
- `with` is a convenient way to make sure we close out our database connection after we are done performing our operation
- When the block of code completes, the `__exit__` function that is written for us on the connection or cursor runs, closing out said connection. The `__exit__` function is also run when errors are encountered.
- If we didn't use `with` we ould have to create `try`/`except`/`finally` blocks to establish our connection, perform our operations, commit any changes, then make sure our connection was closed.

### Flask
#### Flask Intro
1. Setup a new Flask project
- Install Flask into an environment
  - `pipenv install Flask~=1.1`
- Import flask into your app
  - `from flask import Flask`
- Create an instance of Flask, typically done with the `__name__` to use the name of the file
  - `app = Flask(__name__)`

2. Run a simple Flask web application on your computer
- Create a basic route on your app. We use the `@<<app-name>>.route('/<<route>>')` decorator before a function that returns whatever the route should return:
```py
@app.route('/')
def hello():
  return '<h1>Hello, world!</h1>'
```
- In order to run, we need to have a `FLASK_APP` environment variable to specify the file to use. We'll do this in a more advanced way below, but here we're simply adding the variable in the terminal:
  - `export FLASK_APP=app-name.py`
- We use the `run` command on `flask` in order to start our application. We can do this from outside our shell:
  - `pipenv run flask run`
- Or we can enter our shell first:
  - `pipenv shell`
  - `flask run`

3. Utilize basic configuration on a Flask project
- We can use the `-p` flag to indicate a port to run on
  - `pipenv run flask run -p 8080`
- We have two major environment variables that affect our app:
  - FLASK_APP: sets the file to run when we call `flask run`
  - FLASK_ENV: setting to `development` overrides the default `production` environment and allows debugging
- Besides setting the environment variables in the terminal, we can also use a `.flaskenv` file.
  - Create the file at the root of your app and add in environment variables as the content:
  ```
  FLASK_APP=simple.py
  FLASK_ENV=development
  ```
  - Install `python-dotenv` in order to pull in 
    - `pipenv install python-dotenv~=0.13`
  - Running flask will now pull in the variables from the file instead of having to set them in the terminal
- We can also utilize the Flask instance's `config` dictionary to use set up configuration variables. A good design pattern is to create a `Config` class that houses these key/value pairs
  - Create a `config.py` file to house your class.
  - In this file, import the `os` package in order to interact with environment variables.
  - Have the `Config` class inherit from `object` for easy importing into the config dictionary
  - Set the variables that you'd like to define directly in the class. You can pull in environment variables or hardcode them:
  ```py
  import os

  class Config(object):
      GREETING = 'Salutations, superior students!'
      # If a SECRET_KEY environment variable exists, use it, otherwise use the hardcoded value
      SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-key-for-devs'
  ```
  - In your app, import your `Config` class, then add in the class variables that you created into the `config` dictionary using the `from_object` method.
  - From there, you can utilize your configuration variables anywhere that you have access to your app:
  ```py
  from flask import Flask
  # Load configuration class
  from config import Config

  app = Flask(__name__)
  # Apply configuration from class
  app.config.from_object(Config)
  # Test value of variable that may or may not come from the environment
  print("SECRET KEY IS: ", app.config["SECRET_KEY"])


  @app.route('/')
  def hello():
      # Use configuration variable
      return f'<h1>{app.config["GREETING"]}</h1>'
  ```


#### Routing in Flask
1. Create a static route in Flask
- Use the `@app.route('/<<route-name>>)` decorator to create a static route (one without wildcards)
- Using multiple route decorators for the same function means each of those routes will use the same function, returning the same content:
```py
from flask import Flask
app = Flask(__name__)


@app.route('/')
@app.route('/home')
def home():
    return '<h1>Home</h1>'


@app.route('/about')
def about():
    return '<h1>About</h1>'
```

2. Create a parameterized route in Flask
- We can capture wildcards in our routes by surrounding them with `<wildcard-name>`
- The wildcard is then passed specified as a parameter to the function that we are decorating.
- We can also specify data type that we require for a wildcard by using `<type:wildcard-name>`, such as `<int:id>`. Only routes matching that type will use the function. If a different type is used, Flask will generate a standard 404.
```py
@app.route('/item/<int:id>')
def item(id):
    return f'<h1>Item ID: {id}</h1>'

@app.route('/item/<name>')
def item(name):
    return f'<h1>Item Name: {name}</h1>'
```

3. Use decorators to run code before and after requests
- Special decorators can be used to run methods before each request, such as loading the logged-in user from the session, after each request, such as closing a database connection, or before the first request is handled, such as initializing your application:
```py
@app.before_request
def before_request_function():
    print("before_request is running")

# after_request takes in and returns the response
# This allows us to do any manipulation to the response if needed
# Even if we don't, we need to return it to the client
@app.after_request
def after_request_function(res):
    print("after_request is running")
    return res

@app.before_first_request
def before_first_function():
    print("before_first_request happens once")
```

4. Identify the "static" route
- Flask will automatically respond to requests to `/static/<<resource-name>>` by returning a file that matches the name housed in a `static` directory.
  - A request to `http://localhost:5000/static/images/puppy.png` will return the `puppy.png` image file housed inside of our app's `static/images/` directory.
- This is useful for returning assets such as images or css files that we are storing on our server.


#### Jinja Templates
1. Use a Jinja template as return for a Flask route with `render_template`
- Jinja is a similar concept to serving pug file from our Express servers.
- Add the Jinja package to your application
  - `pipenv install Jinja2~=2.11`
- Create a `templates` folder within your application to house your templates.
- In `templates`, create html files that you would like your routes to return.
- In your app, import `render_template` from `flask`. Instead of returning HTML strings directly, invoke `render_template` with the name of the html file you would like to return:
```py
from flask import (Flask, render_template)

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')
```

2. Add variables to a Jinja template with `{{ }}`
- The real benefit of Jinja comes from being able to generate html more dynamically.
- We can use `{{ variable-name }}` in our html files to fill in values that were passed in as kwargs to `render_template`
```py
# app.py
from flask import (Flask, render_template)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html', sitename='My Sample', page="Home")
```
```html
<!-- templates/index.html -->
<!doctype html>
<html>

<head>
    <title>{{ page }} - {{ sitename }}</title>
</head>

<body>
    <h1>{{ sitename }}</h1>
    <h2>{{ page }}</h2>
    <p>Coming soon to a browser near you...</p>
</body>

</html>
```
- We can also utilize `{% %}` to evaluate conditionals or loops in our html. We use `{% endif %}` and `{% endfor %}` to close those blocks:
```html
<!-- logged_in is a variable passed to the template -->
{% if not logged_in %}
  <a href="/login">Log in</a>
{% endif %}

<ul>
  <!-- navigation is an iterable passed to the template -->
  {% for item in navigation %}
    <li>
      <a href="{{ item.href }}">{{ item.caption }}</a>
    </li>
  {% endfor %}
</ul>
```

3. Use `include` to share template content in Jinja
- We can reuse small templates within larger templates with the `include` keyword, followed by the name of the template we are including.
- We use the same `{% %}` syntax to evaluate our code within the html:
```html
<!-- nav.html -->
<a href="/">Home</a>
<a href="/about">About</a>

<!-- copyright.html -->
&copy; 2020 Me, myself, and I. All rights reserved.

<!-- index.html -->
<!doctype html>
<html>

  <head>
      <title>{{ page }} - {{ sitename }}</title>
  </head>

  <body>
      <h1>{{ sitename }}</h1>
      <h2>{{ page }}</h2>
      {% include 'nav.html' %}
      <p>Coming soon to a browser near you...</p>
      {% include 'copyright.html' %}
  </body>

</html>
```
4. Reference to Jinja docs: https://jinja.palletsprojects.com/en/2.11.x/templates/


#### Using Forms with WTForms
1. Start a project with Flask, Jinja and Flask-WTF
- Creating a new project folder.
- Install packages with pipenv
```bash
pipenv install Flask~=1.1
pipenv install Jinja2~=2.11
pipenv install python-dotenv~=0.13
pipenv install Flask-WTF~=0.14
```
- Create a subfolder named `app`, a subfolder of `app` named `templates` and create five files.
  - Flask environment file in the project folder: `.flaskenv`
  ```
  FLASK_APP=app
  FLASK_ENV=development
  SECRET_KEY=super-secret-stuff
  ```

  - Application file in the app subfolder: `__init__.py`
  ```py
  from flask import (Flask, render_template)
  # import config class
  from app.config import Config
  # import form class
  from app.sample_form import SampleForm

  app = Flask(__name__)
  # populate Flask config dictionary from config class
  app.config.from_object(Config)

  @app.route('/')
  def index():
      # keep sample simple with just a link to the form
      return '<h1>Simple App</h1><a href="/form">Form</a>'

  @app.route('/form')
  def form():
      # instantiate form
      form = SampleForm()
      # send form into Jinja template (with form=form)
      return render_template('form.html', form=form)
  ```

  - Configuration module in the app subfolder: `config.py`
  ```py
  import os

  class Config(object):
      # Property used by multiple Flask add-ons for security
      SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-key-for-devs'
  ```

  - Jinja template in the app/templates subfolder: `form.html`
  ```html
  <!doctype html>
  <html>

    <head>
        <title>Sample Form</title>
    </head>

    <body>
        <h1>Sample Form</h1>
        <!-- form starts here -->
        <form action="" method="post" novalidate>
            {{ form.csrf_token }}
            <p>
                {{ form.name.label }}
                {{ form.name(size=32) }}
            </p>
            <p>{{ form.submit() }}</p>
        </form>
        <!-- form ends above -->
    </body>

  </html>
  ```

  - Sample form file in the app subfolder to utilize flask_wtf: `sample_form.py`
  ```py
  from flask_wtf import FlaskForm
  from wtforms import StringField, SubmitField


  class SampleForm(FlaskForm):
      name = StringField('Name')
      submit = SubmitField('Save')
  ```


2. Use the following basic field types in WTForms
    - BooleanField
    - DateField
    - DateTimeField
    - DecimalField
    - FileField
    - MultipleFileField
    - FloatField
    - IntegerField
    - PasswordField
    - RadioField
    - SelectField
    - SelectMultipleField
    - SubmitField
    - StringField
    - TextAreaField
  - Be comfortable with using the `wtforms` docs for basic syntax of these other fields you may use in a form. https://wtforms.readthedocs.io/en/2.3.x/fields/#basic-fields

#### Handling POSTs with WTForms
1. Use WTForms to define and render forms in Flask
- We can allow a route to respond to different HTTP methods by providing the list of accepted methods to the `route` decorator. `GET` is the only default:
```py
@app.route('/form', methods=['GET', 'POST'])
```
- Having both a `GET` and `POST` method listed allows us to both post to this route from our form and also serve up the form if a get request is made. This is especially helpful when we want to be able to keep the user on the same page when validation errors occur, allowing us to show error messages.

2. Use WTForms to validate data in a POST with the built-in validators
- We can import validators into our form from `wtforms.validators` such as DataRequired to indicate we want some sort of data in the field or Length to specify a min or max length of input.
- We invoke these functions in a `validators` list on the form field, passing in any necessary arguments:
```py
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Length

class SampleForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired(), Length(min=4, max=12)])
    submit = SubmitField('Save')
```
- In our app, we can handle requests based on whether it is a `GET` request for the form, a `POST` with valid data, or a `POST` with invalid data.
- Invoking `validate_on_submit` on our form instance will return `True` if the `POST` did not have any validation errors. From there we can use the `form.data` dictionary to do something with what the user submitted. We can also `redirect` as long as we import it from `flask`
- If the form was submitted with errors, `validate_on_submit` will populate a `form.errors` dictionary, which can be used in the templates to display errors to the user
```py
from flask import (Flask, render_template, redirect)
# import config class
from app.config import Config
# import form class
from app.sample_form import SampleForm

app = Flask(__name__)
# populate Flask config dictionary from config class
app.config.from_object(Config)

@app.route('/')
def index():
    # keep sample simple with just a link to the form
    return '<h1>Simple App</h1><a href="/form">Form</a>'

@app.route('/form', methods=['GET', 'POST'])
def form():
    # instantiate form
    form = SampleForm()
    if form.validate_on_submit():
      print(form.data)
      return redirect('/')

    # send form into Jinja template (with form=form and errors=form.errors)
    return render_template('form.html', form=form, errors=form.errors)
```

#### Routing Blueprints in Flask
1. Create a Flask Blueprint
- Blueprints allow us to organize our code by breaking our routes out to individual modules, much like Routers did for us in Express.
- We create a Blueprint by importing it from `flask`, then invoking it with a name, 
a file name to indicate where it's defined (just like when we defined our Flask app), and a url_prefix, which will prepend all routes to this Blueprint.
```py
from flask import Blueprint

bp = Blueprint('admin', __name__, url_prefix='/admin')
```

2. Register the Flask Blueprint with the Flask application
- To connect our Blueprint to our app, we import the module that it is defined in, then invoke the app's `register_blueprint` method with a reference to the Blueprint instance as an argument.
```py
from flask import Flask
import routes # assuming we have routes module in this directory

app = Flask()
# (other flask app configuration)

# The routes module has an admin submodule, which we are referencing the bp from
app.register_blueprint(routes.admin.bp)
```

3. Use the Flask Blueprint to make routes
- Where we defined the Blueprint, we can use the `@<<blueprint-name>>.route` decorator exactly like we would use it on the app in our main file
```py
# In the routes/admin.py
from flask import Blueprint

bp = Blueprint('admin', __name__, url_prefix='/admin')

# This route is now /admin/dashboard because it uses the
# url_prefix="/admin" from the Blueprint registration as
# the beginning of the route and, then, adding the route
# registered, /dashboard, to it.
@bp.route('/dashboard', methods=('GET', 'POST'))
def admin_dashboard():
    # Do stuff to show the dashboard
```

#### Flask Sessions
1. Configure and use sessions in Flask
- We can use sessions to track data for a specific user across request/response cycles.
- We must have a `SECRET_KEY` set up to use sessions
- Import `session` from the `flask` packages, then we can utilize the session object to read, write, and delete data.
- We can use `in` to check if a key exists.
- We can assign a value by using `session['key-name'] = ***`
- We can get a value currently in a key with `session.get('key-name')`
- We can delete a value at a key with `session.pop('key-name', None)`
```py
from flask import Flask, session # More things, if you need them

app = Flask()

# other configuration of the Flask application object

@app.route('/visits-counter/')
def visits():
    if 'visits' in session:
        # reading and updating session data
        session['visits'] = session.get('visits') + 1
    else:
        # setting session data
        session['visits'] = 1
    return "Total visits: {}".format(session.get('visits'))

@app.route('/delete-visits/', methods=["POST"])
def delete_visits():
    session.pop('visits', None) # delete visits
    return 'Visits deleted'
```
