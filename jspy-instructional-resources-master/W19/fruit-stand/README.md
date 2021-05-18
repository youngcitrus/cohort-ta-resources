# Express and Flask development Demos:
In redux-frontend: npm start
In express-backend: npm start
## At this point you can interact with the app as usual. Stopping the express app and starting the flask app should allow you to interact with it in the exact same way.
## Express was set up to use port 8080 by default, so I specified it here as well
In flask-backend: pipenv run flask run -p 8080

# Flask production Demo:
## After building, our app expects the client/build files to be in our server directory, so I copied them over for this demo. This can be automated with Docker.
In flask-prod: npm install --prefix client && npm run build 
		pipenv run flask run


# Docker Demo:
docker-compose up
## The command below executes a command to our container to run our seeder file. This file allows us to create instances of our models and save them to the database using our standard flask-sqlalchemy syntax
docker exec -it flask_prod_web_1 sh -c 'python seeder.py'
## Alternatively, we can pipe in a sql file. Only downside is the hashed_password would have to be known (copied from a previous call to the hashing function) since it will not be available to us outside of python
cat ./heroku_seeds.sql | docker exec -i flask_prod_db_1 psql fruitstand -U user


# Pushing to Heroku
heroku container:push web -a flaskfruitstand
heroku container:release web -a flaskfruitstand

(provision postgres on the heroku website)

## The command below opens up the interactive postgres terminal for our hosted database, good for debugging/seeing what's in your database
heroku pg:psql -a flaskfruitstand

## This reads in our seed sql file and provides it as commands to our hosted database, allowing us to seed production from the terminal
cat ./heroku_seeds.sql | heroku pg:psql -a flaskfruitstand
