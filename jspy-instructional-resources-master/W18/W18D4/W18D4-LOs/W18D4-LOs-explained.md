## Alembic and Pug (W18D4) Learning Objectives

### Migrations with Alembic
1. Install Alembic into your project
- Alembic is a Python package, so we install it in the same way as usual with pipenv
- We must also have a database package to work with. While psycopg is not the only one, it is what we've been using and will continue to use, so it's included here as well:
- `pipenv install alembic psycopg2-binary`

2. Configure Alembic to talk to your database and not have silly migration names
- The alembic command line tool as a function that will generate many necessary files automatically for you:
```bash
pipenv run alembic init <directory-name-to-add-config-and-migration-files>
#  Many developers will just use 'alembic' as the directory name, so it becomes
pipenv run alembic init alembic
#  or if you are inside your pipenv shell
alembic init alembic
```
- One configuration setting that you will want to change is how alembic names its migration files.
  - In `alembic.ini`, the `file_template` variable (default commented out) shows how the files will be named.
  - Replace that line with something more meaningful, such as the following, which adds a timestamp before the name of the migration:
    - `file_template = %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(slug)s`
  - After making this change, you'll easily be able to see the order that migrations will run in.
- Another configuration that we need to take care of is making sure alembic pulls in our database url from an environment variable instead of trying to use a hardcoded value (which would generally be a bad idea since (1) it will be checked in to version control and (2) it will probably change based on our environment (ie development vs production))
  - In `env.py`, import os so that we can access the environment variables:
    - `import os`
  - Before the declaration of `run_migrations_offline`, set up our config option to read `DATABASE_URL` for our `sqlalchemy.url` value:
    - `config.set_main_option("sqlalchemy.url", os.environ.get("DATABASE_URL"))`
  - Be sure to use the DATABASE_URL environment variable with the appropriate url (most likely adding it to a `.env` file)
    - example: `DATABASE_URL=postgresql://alembic_test:alembic_test@localhost/alembic_test`

3. Control Alembic's ability to migrate your database
  - Alembic uses the term `revision` for what we know of as migrations
  - To generate a revision, use the `revision` command from `alembic`, adding on a message about the revision with the `-m` flag:
    - `(pipenv run) alembic revision -m"create the owners table"` (pipenv run) is needed if we aren't inside the shell
  - A file is generated in the `versions` folder for this new revision. We can add in whatever code we want to run on migration to the `upgrade` function, typically creating a table and defining the columns:
  ```py
  def upgrade():
      op.create_table(
          "owners",
          sa.Column("id", sa.Integer, primary_key=True),
          sa.Column("first_name", sa.String(50), nullable=False),
          sa.Column("last_name", sa.String(50), nullable=False),
          sa.Column("email", sa.String(255), nullable=False),
      )
  ```
  - We can also specify what to do when we undo a migration by filling out the `downgrade` function, typically dropping the table:
  ```py
  def downgrade():
      op.drop_table("owners")
  ```
  - With our migrations created, we can tell alembic that we want to run them with the `alembic upgrade <revision>` command, where `<revision>` is one of the following:
    - `head`: run all revisions that haven't been applied yet
    - `+n`: run n number of revisions from the currently applied one (eg `alembic upgrade +1` to apply just the next revision)
    - `<revision number>`: run all of the revisions up to the specified revision number
  - We can see the history of our migrations with `alembic run history`. The output is similar to a git log, showing where we currently are (head) and the revision numbers and messages for each revision in the history.
  - Similar to upgrade for applying migrations, we can downgrade to rollback migrations. We use `alembic downgrade <revision>` with very similar options:
    - `base`: roll back all revisions
    - `-n`: roll back n number of revisions from the currently applied one
    - `<revision number>`: roll back all revisions back to the specified revision number

4. Reason about the way Alembic orders your migrations
- Alembic orders migrations through a linked list system.
- When we create a new migration (revision) we keep a reference to the previous one in the `down_revision` attribute.
- In order to undo a migration, Alembic runs its `downgrade`, then continues along the chain to the previous migration.

5. Handle branching and merging concerns
- If two different revisions are made separately (such as from different branches on a team project), the linked list nature of revisions gets interrupted. Each of the new revisions has a `down_revision` that points the same previous revision before branching. This means our histor looks like a tree instead of a linked list. Running an upgrade command to head will fail because there are two heads at this point.
- To fix this branching issue, we can tell alembic to merge our revision history.
- The command `alembic merge -m "<message>" <revision-number-1> <revision-number-2>` will tell alembic to make a new revision after the branching that combines the heads into one. The `down_revision` of this new revision that was created ends up being a tuple that points us to either branch.
- This process is best visualized:
```
                     -- ae1027a6acf (Team A's most recent)
                    /
<-- 1975ea83b712 <--
                    \
                     -- 27c6a30d7c24 (Team B's most recent)
```
```bash
pipenv run alembic merge -m "merge contracts and devices" ae1027 27c6a
```
```
                     -- ae1027a6acf <--
                    /                  \
<-- 1975ea83b712 <--                    -- 53fffde5ad5
                    \                  /
                     -- 27c6a30d7c24 <-
```
- After this merge process we can use our standard `alembic upgrade head` to add in both revisions that were previously branched.

### Using Alembic with Flask
1. Configuring a Flask application to use Alembic
- To use Alembic with our Flask app, we add in two packages, `alembic` itself, and `Flask-Migrate`, which integrates Alembic with Flask:
  - `pipenv install alembic Flask-Migrate`
- Make sure that Flask has all of its standard environment variables set up, including `FLASK_APP`, `FLASK_ENV`, and `DATABASE_URL` (we generally use this name for compatibility with other platforms, then pull it in to our Flask app as `SQLALCHEMY_DATABASE_URI`). Having an additional variable `SQLALCHEMY_TRACK_MODIFICATIONS` pointing to False will remove some warnings about the deprecated feature for you.
- We can create our models like usual with `SQLAlchemy`:
```py
# app/models.py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
```
- In our main application file, set up our Flask app and add in our config keys (this can be done multiple ways, as we saw previously). We can initialize our database with our app and then use `Migrate` from `flask_migrate` to configure our application to use Alembic:
```py
# app/__init__.py
from app.models import db
from flask import Flask
from flask_migrate import Migrate
import os

app = Flask(__name__)
# We could use a from_object and pass in a config class
# This is a simple way to add in the values directly in this file
app.config.from_mapping({
  'SQLALCHEMY_DATABASE_URI': os.environ.get('DATABASE_URL'),
  'SQLALCHEMY_TRACK_MODIFICATIONS': False,
})
# This is allowing us to create our db in another location, then initialize the app here
# It's an alternative to passing in the app to SQLAlchemy(), since we are invoking that function in our models file
db.init_app(app)
Migrate(app, db)  # Connects our app to be able to generate alembic migrations
```

2. Run commands to manage your database through the flask command
- Many commands that we could run working with alembic directly (as opposed to within a flask application) can be run with the `db` command added to `flask` from the `Flask-Migrate` extension. We can run our `init` command to create the configuration files that alembic uses.
  - `flask db init`
- This command creates a `migrations` directory at the top level of our application (similar to how we specified an `alembic` directory when previously working with it directly). This directory houses our configuration files and ultimately our revisions that will be generated.
- Since our database url will already be taken in by our Flask app, the only change that we still should make to these configuration files is changing the naming convention of our revision files.
  - In `alembic.ini` change the `file_template` (commented out by default) to something more useful, such as timestamping the file:
    - `file_template = %%(year)d%%(month).2d%%(day).2d_%%(hour).2d%%(minute).2d%%(second).2d_%%(slug)s`

3. Autogenerate migrations from your models
- With our configuration complete, we can create a new model as usual. For example:
```py
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class Owner(db.Model):
    __tablename__ = "owners"

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(255), nullable=False)
```
- With this model created, we can run the `migrate` command in order to automatically create a revision that has all of these column names/types, primary key indicator, etc., as well as a drop_table statement in our downgrade, no direct interaction with alembic or revisions at all!
  - `flask db migrate -m "create owners table` automatically generates a revision file with the functions completely filled out for you:
  ```py
  def upgrade():
      # ### commands auto generated by Alembic - please adjust! ###
      op.create_table('owners',
      sa.Column('id', sa.Integer(), nullable=False),
      sa.Column('first_name', sa.String(length=50), nullable=False),
      sa.Column('last_name', sa.String(length=50), nullable=False),
      sa.Column('email', sa.String(length=255), nullable=False),
      sa.PrimaryKeyConstraint('id')
      )
      # ### end Alembic commands ###


  def downgrade():
      # ### commands auto generated by Alembic - please adjust! ###
      op.drop_table('owners')
      # ### end Alembic commands ###
  ```
- With a revision created for us, we can invoke `upgrade` to apply those changes to our database:
  - ` flask db upgrade`
  - Note that this command automatically upgrades to the lates revision (head)

4. Why use Alembic instead of just creating a model and running our `db.drop_all()` and `db.create_all()`?
- Alembic lets us build up changes to our database over time. We can roll back to a specific revision to interact with a previous version of our database schema.
- Modifying tables is extremely simple. Since we can only drop all and create all with the SQLAlchemy `db`, we have to completely rebuild our database with each change. If we want to preserve data, we would have to pull it out, implement our change, then insert the old data back in (potentially having to modify each record to accomodate the changes).

### Using Pug with Flask
1. Install, configure, and use Pug with Flask
- We can use many template engines with Flask, not just the standard Jinja!
- To use Pug, we just need to install `pypugjs` into our application, then add it as an extension to our app:
  - `pipenv install pypugjs`
```py
# app/__init__.py (wherever our Flask app is defined)
app = Flask(__name__)
app.jinja_env.add_extension('pypugjs.ext.jinja.PyPugJSExtension')
```
- In our routes, we can use the same `render_template` function, pointing to the pug file that we want to render from our `templates` directory:
```py
@app.route("/")
def index():
    return render_template("index.pug", title="Hello, Pug")
```
