from flask import Flask, send_from_directory
from flask_migrate import Migrate
from flask_cors import CORS
import os

from app.config import Configuration
from app.routes import items, companies, session
from app.models import db

# If we are in production, use the build directory created by React
if os.environ.get("FLASK_ENV") == 'production':
  app = Flask(__name__, static_folder='../client/build/static', static_url_path='/static')
else:
  app = Flask(__name__)

CORS(app)
app.config.from_object(Configuration)
db.init_app(app)
migrate = Migrate(app, db)

app.register_blueprint(items.bp)
app.register_blueprint(companies.bp)
app.register_blueprint(session.bp)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
    print(f'caught_path: {path}')
    path_dir = os.path.abspath("./client/build") #path react build
    # If we make a request to /static/<some-file-path> for a directory that exists in
    # our static build folder, serve that file
    # This could be useful if we have images, audio, etc., that we want to have
    # available as static resources
    if path and os.path.exists(f'./client/build/static/{path}'):
      return send_from_directory(os.path.join(path_dir), path)
    # Otherwise, serve up the index.html. Our React router will handle any other routes
    else:
      return send_from_directory(os.path.join(path_dir),'index.html')
