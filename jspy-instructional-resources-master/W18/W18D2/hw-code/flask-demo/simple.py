from flask import Flask
app = Flask(__name__)

@app.before_request
def before_request_function():
    print("before_request is running")

@app.after_request
def after_request_function(res):
    print("after_request is running")
    return res

@app.before_first_request
def before_first_function():
    print("before_first_request happens once")


@app.route('/')
@app.route('/home')
def home():
    return '<h1>Home</h1>'


@app.route('/about')
def about():
    return '<h1>About</h1>'

@app.route('/item/<int:id>')
def item(id):
    return f'<h1>Item {id}</h1>'