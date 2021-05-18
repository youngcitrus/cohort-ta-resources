// app.js

const express = require('express');

// Create the Express app.
const app = express();

// Set the pug view engine.
app.set('view engine', 'pug');

// Define helper functions to simulate
// unexpected application errors.

const throwError = () => {
	throw new Error('An error occurred!');
};

const throwAsyncError = () => {
	const err = new Error('An async error occurred!');
	return Promise.reject(err);
};

// Define routes.

app.get('/', (req, res) => {
	res.render('index', { title: 'Home' });
});

app.get('/throw-error', (req, res) => {
	throwError();

	// NOTE: This statement won't be executed.
	res.render('throw-error', { title: 'Throw Error' });
});

app.get('/throw-async-error', async (req, res, next) => {
	try {
		await throwAsyncError();

		// NOTE: This statement won't be executed.
		res.render('throw-async-error', { title: 'Throw Asynchronous Error' });
	} catch (err) {
		next(err);
	}
});

// Custom error handlers.

// Error handler to log errors.
app.use((err, req, res, next) => {
	if (process.env.NODE_ENV === 'production') {
		// TODO Log the error to the database.
	} else {
		console.error(err);
	}
	next(err);
});

// Generic error handler.
app.use((err, req, res, next) => {
	res.status(err.status || 500);
	const isProduction = process.env.NODE_ENV === 'production';
	res.render('error', {
		title: 'Server Error',
		message: isProduction ? null : err.message,
		stack: isProduction ? null : err.stack
	});
});

// Define a port and start listening for connections.

const port = 8080;

app.listen(port, () => console.log(`Listening on port ${port}...`));
