## Decorators, Psycopg, and Flask (W18D2) Learning Objectives

### Decorators
1. Be able to explain what a Python decorator is
2. Understand how callbacks and closures are connected to Python decorators
3. Know how to define custom decorator functions with and without syntactic sugar
4. Understand how to use `@property`, a built-in class decorator
5. Know how to use `*args` and `**kwargs` to manage decorator arguments
6. Recognize popular decorator libraries

### Psycopg
1. Connect to a PostgreSQL RDBMS using Psycopg
2. Open a "cursor" to perform data operations
3. Use results performed from executing a `SELECT` statement on existing database entities
4. Use parameterized SQL statements to insert, select, update, and delete data
5. Specify what type Psycopg will convert the following PostgreSQL types into:
    - NULL
    - bool
    - double
    - integer
    - varchar
    - text
    - date
6. Use the `with` keyword to clean up connections and database cursors

### Flask
#### Flask Intro
1. Setup a new Flask project
2. Run a simple Flask web application on your computer
3. Utilize basic configuration on a Flask project

#### Routing in Flask
1. Create a static route in Flask
2. Create a parameterized route in Flask
3. Use decorators run code before and after requests
4. Identify the "static" route

#### Jinja Templates
1. Use a Jinja template as return for a Flask route with `render_template`
2. Add variables to a Jinja template with `{{ }}`
3. Use `include` to share template content in Jinja

#### Using Forms with WTForms
1. Start a project with Flask, Jinja and Flask-WTF
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

#### Handling POSTs with WTForms
1. Use WTForms to define and render forms in Flask
2. Use WTForms to validate data in a POST with the built-in validators

#### Routing Blueprints in Flask
1. Create a Flask Blueprint
2. Register the Flask Blueprint with the Flask application
3. Use the Flask Blueprint to make routes

#### Flask Sessions
1. Configure and use sessions in Flask
