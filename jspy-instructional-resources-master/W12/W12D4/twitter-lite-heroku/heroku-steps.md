# Hosting Your Express App on Heroku

## Preparing Your Application

1. Separate your repositories for frontend and backend.
	- If you already have one repository that encompasses both, I would break out your backend directory and make a new repo just for that section.

2. Each of your package.json files should have a "start" script which kicks off the application (this can use per-env to distinguish between development and production)
	- Frontend:
		"scripts": {
			"start": "per-env",
			"start:development": "nodemon -r dotenv/config index.js",
			"start:production": "node index.js"
		}
	- Backend:
		"scripts": {
			"start": "per-env",
			"start:development": "nodemon -r dotenv/config ./bin/www",
			"start:production": "./bin/www"
		}

3. Check which version of node you are running and add an `engines` key to your package.json files. While not strictly necessary, this ensures that heroku runs the same version that you are running locally.
  - node -v (in the terminal)
  "engines": {
    "node": "10.x"
  }

4. Configure our backend to account for our production database:
	- In config/database.js:
		module.exports = {
			development: {
				username,
				password,
				database,
				host,
				dialect: 'postgres',
				seederStorage: 'sequelize'
			},
			production: {
				dialect: 'postgres',
				seederStorage: 'sequelize',
				use_env_variable: 'DATABASE_URL'
			}
		};

5. We've only been working with development versions of our projects, so we could hard-code localhost for our fetch requests, cors origins, etc. Now we want to be able to generate these dynamically based on environment variables.
	- In our backend .env file, add a FRONTEND_URL key. This is most likely going to be in addition to keys such as PORT, JWT_SECRET, etc.
	- In our .env file, we can specify localhost, since this file is only used in production. In our production deployment, we'll specify environment variables on Heroku.
		PORT=8080
		FRONTEND_URL=http://localhost:4000
		DB_USERNAME=twitter_lite
		DB_PASSWORD=uhohspaghettio
		DB_DATABASE=twitter_lite
		DB_HOST=localhost
		JWT_SECRET=343F!$%%JK2abeejkal
		JWT_EXPIRES_IN=604800
	- In our frontend .env file, specify our BACKEND_URL as our localhost port
		PORT=4000
		BACKEND_URL=http://localhost:8080

6. Now that we have environment variables defined for our development environment, we can modify some of our hard-coded domains.
	- In our backend server's app.js, we defined our cors policies for our frontend localhost port. Change this to point to whatever our frontend url may be:
		const origin = process.env.FRONTEND_URL;
		app.use(cors({ origin }));
	- Our frontend is slightly more involved. JavaScript files run in browsers do not have access to environment variables like the files run in node do. In order for our app's frontend js files to be able to refer to our backend url, we need to attach it to the html that is being served.
		- Add the BACKEND_URL environment variable to the local variables our express router is giving access to. In our frontend's index.js (or whatever you may have called your main file):
			app.locals.backend = process.env.BACKEND_URL;
		- By setting a `backend` variable, we can now access this within the pug files that we render. Since every pug file is inheriting from our layout.pug, we can add a script tag that includes this value. If we didn't have all of our templates inherit from one source, we could just as easily add a script to each individual pug file.
			doctype html
			html
				head
				title Twitter Lite
				link(rel='stylesheet' type='text/css' href='/style.css')
				script(backend=backend)
		- Now that our backend url has been made available to each html page that is being rendered, we can create a utility variable that pulls this data out of our html for further use. In our utils.js, we get a reference to the script tag that we have at the top of each page, then extract the attribute (backend) that we defined on it.
			export const backendUrl = document.getElementsByTagName('script')[0].getAttribute('backend');
		- This value can now be imported wherever we are making a connection to our backend. In our js files' `fetch` functions, instead of hardcoding localhost, we can now interpolate the dynamic backendUrl:
			import { handleErrors, backendUrl } from './utils.js';
				const fetchTweets = async () => {
					const res = await fetch(`${backendUrl}/tweets`, {
					...

7. We can check that these changes have not affected our development environment by trying to navigate around our local application.

## Connecting to Heroku

1. Create an account on heroku
  - https://signup.heroku.com/dc

2. Download the heroku cli
  - https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up

3. Log in to heroku in the cli
  - `heroku login`
	- This will open your web browser and you'll log in on the site

4. Create your Heroku app for each of your servers
	- `heroku create -a twitter-lite-demo`
	- `heroku create -a twitter-lite-backend-demo`
	- If you don't pass a name argument, one will be generated for you. You can change it on the website.

5. Push your app's repository up to the heroku server
	- `git push heroku master`

6. For your backend server, add a postgres database (we're specifying the free tier hobby-dev)
	- `heroku addons:create heroku-postgresql:hobby-dev`

7. On the Heroku website, add in any environment variables that your application depends on. It won't need the database username/password/etc., as that connection information will be created for you from the addition of the postgres addon. We will need to add in our FRONTEND_URL, JWT_SECRET, and JWT_EXPIRES_IN keys for our backend app, and our BACKEND_URL for our frontend app. The frontend and backend url keys that we're creating are the urls that point to our hosted applications, so they will look something like `https://twitter-lite-demo.herokuapp.com` and `https://twitter-lite-backend-demo.herokuapp.com`, for example.

8. Run any migrations and seed files that you have created so that your production database has the appropriate structure/content:
	- `heroku run npx sequelize-cli db:migrate`
	- `heroku run npx sequelize-cli db:seed:all`