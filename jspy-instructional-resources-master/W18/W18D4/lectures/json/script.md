Hello, developers, and welcome to a lecture on using JSON with Flask.

During this lecture, I'm going to show you how I would use the documentation to
solve problems as I go along. This is something that you should be comfortable
with. If you're not, I would advise that you get comfortable with it because
every software developer at some point spends more time in documentation than
they do in coding.

I've got the Petrack application loaded, here. You can see that the HTML portion
of the application works just fine. What I'd like to do now is to add some API
endpoints so that I can call them using AJAX rather than using normal full-page
reloads on each request.

You can see in Insomnia, my API client, that when I try to make calls for the
`/api/pets` route, that I get 404s.

I have a `routes.py` file, here, that contains all of the routes for the HTML
portion of the application. I want to keep my routes separate for easier
maintenance. I'm going to create a new file in the `app` directory to hold my
API routes. I'm going to call it `api_routes.py`. In here, I'm going to import
the `Blueprint` from `flask` and create a new `Blueprint` object that has the
name "api" and the `url_prefix` setting of "/api".

```python
from flask import Blueprint

bp = Blueprint("api", __name__, url_prefix="/api")
```

Now, I'm going to define just a route for the "/pets" route. This will respond
to "/api/pets" because this `Blueprint` has the `url_prefix` setting of "/api".
Any route I define with this `Blueprint` will have that prefix.

```python
@bp.route("/pets")
def pets():
    return {"message": "You made it!"}
```

When you return a dictionary from a Flask route, it automatically infers that
you want to return JSON and will convert the dictionary and its contents to JSON
and set the appropriate content type of the HTML response.

Once I have that, I just need to register my blueprint in the `__init__.py`
file where I registered the other `Blueprint`

```python
import app.api_routes as api_routes

# ...

app.register_blueprint(api_routes.bp)
```

Now, when I make the request, again, from Insomnia, I see a happy JSON response.

I'd like this to actually return pets rather than this dummy message. I'll go
back to the `api_routes.py` file, import the `Pet` model, and return all of the
pets.

```python
from .models import Pet

#...

pets = Pet.query.order_by(Pet.name).all()
return {"data": pets}
```

I've returned the pets here as the value of a "data" attribute. Let's see what
happens when I make the request, now.

«run request in Insomnia»

I get this `TypeError` that says that "Pet is not JSON serializable." At this
point, I don't know what that means. So, it's off to the documentation.

I'm going to start just by searching for "JSON" and see what I get back. The
first response, `flask.json`, that looks promising, I guess, so I'll choose
that. Oh, good, that took me to a session named "JSON Support". So, I read this
and I find out that it just uses the JSON encoders built into Python.

As I scroll down I see a method named `jsonify`. Maybe that will help me! I
start reading its documentation and see that it wraps a function named `dumps`.
I click on that.

I see that the `dumps` function uses the built-in `json.dumps`, so I click on
that.

That says that it will serialize an object based on a conversion table. So, I
click on that.

And, now, I see that the built-in support for JSON for objects only supports the
dictionary, list, tuple, string, int, float, Boolean, and `None` values. That
means the JSON serializer won't work for my `Pet` class. I can change my `Pet`
class into a dictionary, though.

«open up models.py on the bottom»

I can use a list comprehension to create a dictionary for each pet in my list,
a dictionary that contains the columns that I want to share: id, name, pet type,
age, and has_microchip.

```python
data = [{
    "id": pet.id,
    "name": pet.name,
    "pet_type": pet.type.type,
    "age": pet.age,
    "has_microchip": pet.has_microchip
} for pet in pets]
return {"data": data}
```

Now that I have converted my custom model object into a dictionary, let's see if
the built-in Python JSON serializer can handle that.

It does. I see the values that I'm interested in seeing, here, in the result of
the HTTP GET.

Now, I'd like to be able to handle POST of JSON, too. I'm going to go back to
the search page. The second search item reads "flask.Request.json". Well, that's
what I think I want, because I want the JSON from the HTTP request. I'll click
on it and see what it reads.

The documentation reads "The parsed JSON data". That sounds great to me! That's
on the request object. I wonder how I get that? Back to the search screen.

«type in "request"»

The first result is "flask.request". I'll see what that is. Ah, "To access
incoming request data, you can use the global request object." Perfect! I can
just import `request` from Flask and use the `json` attribute on it to get the
JSON from the request.

```python
from flask import Blueprint, request

# ...

@bp.route("/pets", methods=["POST"])
def create_pet():
    data = request.json
```

Now that I have that data, I can just pass it to the constructor of the `Pet`
data model which will handle all of the attribute setting. Then, I can add the
new pet to the session, commit the session, and return the newly-created pet.

```python
from .models import db, Pet

# ...

    pet = Pet(**data)
    db.session.add(pet)
    db.session.commit()
    return {
        "id": pet.id,
        "name": pet.name,
        "pet_type": pet.type.type,
        "age": pet.age,
        "has_microchip": pet.has_microchip
    }
```

Let's see if the POST now works. Here, I'm creating "Fluffy." You can see in the
results that Fluffy now has an id of 3. And, in the HTML front-end, we see
Fluffy actually show up.

If you look at the code as it is, now, you can see that I have put the same code
in two places. I should fix that by putting it in one place. I could create a
function in this file to do it, however, I feel like this could be a good method
for the actual `Pet` model class itself. So, I'll refactor it to be like that.

«refactor the to_dict method, don't forget to replace `pet` with `self`»

I've just copied over the code that turns this `Pet` into a dictionary. Now, in
the route code, I'll use this method instead of the dictionary code.

«refactor route code to use to_dict»

I'd like to add one more thing, here. You can see that "Fluffy" has no owners.
We want pets to have owners when they get created. That's going to take a little
bit more code. I will add an array of owner ids to the POST.

«add "owner_ids": [1] to JSON»

I want that to associate with the owner when I handle the POST. If you recall,
`Pet` objects have a collection of `Owner` objects associated to them through
the `owners` attribute. I just need to add that to the pet before saving it.

```python
from .models import db, Owner, Pet

# ...

data["owners"] = Owner.query.filter(Owner.id.in_(data["owner_ids"])).all()
```

When I POST, now, ...


I get an error that "owner_ids" is not a valid attribute for the `Pet` object.
Of course it's not. I just need to remove that from the data before providing it
to the `Pet` constructor.

```python
data.pop("owner_ids")
```

If you didn't know how to do that, a simple DuckDuckGo search for "python delete
item from dictionary" would have led you straight to the `pop` method.

When I submit my request, now...


It succeeds. On the Web page, I see that the new Fluffy now has Carlo as an
owner.

If you're interested in validating input from JSON in Flask, there's a very
nice companion library to WTForms called Flask-Inputs that will help you build
schemas by which you can validate your incoming JSON.

I hope this has been an illustrative lecture on how to serve and handle JSON
requests. Happy day, developers.
