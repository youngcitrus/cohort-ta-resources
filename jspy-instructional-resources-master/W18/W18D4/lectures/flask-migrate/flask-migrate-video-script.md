# Flask-Migrate Video Script

Hi programmers! My name is Joanna and today I'll be walking you through how to
use Flask-Migrate with Alembic and SQLAlchemy to manage a PostgreSQL database
from within a Flask app.

## Environment/application setup

1. We'll begin by initializing a virtual environment.

```bash
pipenv install --python "$PYENV_ROOT/shims/python"
```

2. Next, we'll install our project packages. We'll install:

* `Flask` because we're creating a Flask app,
* `Flask-SQLAlchemy` to integrate SQLAlchemy into our Flask application,
* `Psycopg2-binary` to allow SQLAlchemy to connect to our database,
* `alembic` to manage migrations,
* `Flask-Migrate` to integrate alembic with Flask,
* and `python-dotenv` to access environment variables that we'll set in a
  `.flaskenv` file and `.env` file. We'll be using both files, because according
  to the Flask docs, "Variables set on the command line are used over those set
  in .env, which are used over those set in .flaskenv. .flaskenv should be used
  for public variables, such as FLASK_APP, while .env should not be committed to
  your repository so that it can set private variables."

```bash
pipenv install Flask Flask-SQLAlchemy psycopg2-binary alembic Flask-Migrate python-dotenv
```

3. Now let's create a database and database user. Later, we'll use a
   Flask-Migrate command to generate tables in database.

```sql
psql postgres
CREATE USER pets_user WITH CREATEDB PASSWORD 'password';
CREATE DATABASE pets WITH OWNER pets_user;
```

4. Let's set our `FLASK_APP`, `FLASK_ENV`, and `DATABASE_URL` environment
   variables in a `.flaskenv` file. We'll reference our `pets.py` file, set our
   application to run development mode, and reference the `pets_user` we created
   as well as name the `pets` database we'll create.

**.flaskenv**
```
FLASK_APP=pets.py
FLASK_ENV=development
```

**.env**
```
DATABASE_URL=postgresql://pets_user:password@localhost/pets
```

5. Now we'll create a simple Flask app and configure it to use Flask-SQLAlchemy
   and Flask-Migrate. We'll begin by creating an `app` directory with an
   `__init__.py` file and `models.py` file. 

## Application file setup

1. In our `models` file, we'll import `SQLAlchemy` from the `flask_sqlalchemy`
   package to instantiate a database connection. Now we're all set to define a
   few models after our Flask app is initialized!

```python
# app/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
```

2. Now let's go into our `__init__.py` file to initialize our Flask app. From
   `flask` we'll import Flask and from `flask_migrate`, we'll import `Migrate`.
   We'll also want access to the database. From our `app.models` file, let's
   import `db`. Since we set environment variables in our `.flaskenv` file,
   we'll need to import the built-in `os` package to access it.

```python
# app/__init__.py
from app.models import db
from flask import Flask
from flask_migrate import Migrate
import os
```

3. We'll initialize a Flask app and now we'll want to configure SQLAlchemy.
   Let's take a look at the [configuration keys in the official Flask-SQLAlchemy
   documentation](https://flask-sqlalchemy.palletsprojects.com/en/2.x/config/).
   We'll set the `SQLALCHEMY_DATABASE_URI` to the `DATABASE_URL` we set as an
   environment variable to connect to the database. We'll also set the
   `SQLALCHEMY_TRACK_MODIFICATIONS` so that we don't receive warnings, for the
   key being unset.

```python
# app/__init__.py
# ...CODE SHORTENED...

app = Flask(__name__)
app.config.from_mapping({
   'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
   'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
```

4. Now let's connect the database to our application and apply `Flask-Migrate`
   to our application and database.

```python
# app/__init__.py
# ...CODE SHORTENED...

db.init_app(app)
Migrate(app, db)
```

5. Lastly, we'll import our initialize Flask `app` into the `pets.py` file that
   is run with the `pipenv run flask` command.

```python
# pets.py
from app import app
```

## 1st migration: `dogs` table

1. Now we'll initialize the local Alembic environment.

```bash
pipenv run flask db init
```

2. Now if you open up your project directory, you'll see a new `migrations`
   folder and Alembic files within. We'll take a moment to add a timestamp to
   our migration files by editing the `alembic.ini` file.

```
file_template = %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(slug)s
```

3. Let's use a `Flask-Migrate` command to create a `Dog` model in our Flask app
   and a `Dog` table in our database!

```python
# app/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Dog(db.Model):
   __tablename__ = "dogs"

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(20), nullable=False)
   color = db.Column(db.String(20), nullable=False)
```

4. Now let's generate the migration! Notice how the migration also generates
   `upgrade()` and `downgrade()` functions.

```bash
pipenv run flask db migrate -m "create dogs table"
```

5. Now use the `flask db upgrade` command to apply the migrations!

```bash
pipenv run flask db upgrade
```

6. We can check `pets` database and we'll see that we now have a `dogs` table!

```sql
psql pets
\d
```

## 2nd migration: `cats` table

1. Cats seem to be meaner than dogs, so let's add an `is_mean` column that
   defaults to `True`.

```python
# app/models.py
# ...CODE SHORTENED...

class Cat(db.Model):
   __tablename__ = "cats"

   id = db.Column(db.Integer, primary_key=True)
   name = db.Column(db.String(20), nullable=False)
   color = db.Column(db.String(20), nullable=False)
   is_mean = db.Column(db.Boolean, default=True, nullable=False)
```

2. Now let's run our commands to create a migration and run it.

```bash
pipenv run flask db migrate -m "create cats table"
pipenv run flask db upgrade
```

3. Now if we check our database, we'll see that we now have a `cats` table!

```sql
psql pets
\d
```

## 3rd migration: remove `cats` table

1. Since our cats are mean, let's remove the `cats` table from our database.
* We'll check out the `create_cats_table` migration file to find the revision ID
   for us to roll back and remove our `cats` table.
* Note that you can also find the revision ID by viewing the migration logs with
   `pipenv run flask db history`.

2. Now let's use the downgrade command to roll back our database to it state
   before our `cats` model was migrated!

```bash
pipenv run flask db downgrade <revision_id>
```

3. Now if we check our database again, we'll see that our `cats` table is gone
   but that our `dogs` table is still in the database!

```sql
psql pets
\d
```

## Query the database and render in browser

1. Let's seed our database with some dogs!

```sql
INSERT INTO dogs (name, color)
VALUES
('Clifford', 'red'),
('Bambi', 'black'),
('Truffles', 'brown');
```

2. Now we'll create a route that queries the database for all our dogs! We'll
   begin by importing the `Dog` model from the `app.models` file.

```python
# app/__init__.py
from app.models import db, Dog
```

3. Let's create a route at `/dogs` that uses the `query.all()` method to fetch
   all our database dogs. For now, we'll just return the name of the first dog
   found.

```python
# app/__init__.py
# ...CODE SHORTENED...
@app.route('/dogs')
def show_all_dogs():
   dogs = Dog.query.all()
   return dogs[0].name
```

3b. Test in browser

4. Now let's create a route at `/dogs` with an `id` parameter that uses the
   `query.get_or_404()` method to fetch a dog by its ID or render a 404 Not
   Found page.

```python
# app/__init__.py
# ...CODE SHORTENED...
@app.route('/dogs/<int:id>')
def show_dog(id):
   dog = Dog.query.get_or_404(id)
   return dog.name
```

4b. Test in browser

## Render with pug template

1. Now that we have our dog names rendering, we can use a template to easily
   render each dog's information instead! We'll begin by installing the
   `pypugjs` package.

```bash
pipenv install pypugjs
```

2. Now we'll import `render_template` from `flask` and add a Pug extension to
   the Jinja environment. Then we can use the `render_template` function to
   render a `dogs.pug` file that we'll create. We'll also pass in the `dogs` we
   have fetched from the database!

```python
@app.route('/dogs')
def show_all_dogs():
   dogs = Dog.query.all()
   return render_template('dogs.pug', title='All the pups!', dogs=dogs)


@app.route('/dogs/<int:id>')
def show_dog(id):
   dog = Dog.query.get_or_404(id)
   return dog.name
```

3. Now we'll create a `templates` directory and a `dogs.pug` file.

```pug
title= title 
ul
   each dog in dogs
      li #{dog.name} is #{dog.color}.
```

## Conclusion

I hope you enjoyed this demonstration of configuring a `Flask` application with
`Alembic` and `Flask-Migrate` to autogenerate migrations from models! You also
had a refresher of how to use `SQLAlchemy` and `Psycopg2` to query a PostgreSQL
database from within a Flask app. Lastly, saw how quickly you can implement the
Pug templates with the `pypugjs` package!
