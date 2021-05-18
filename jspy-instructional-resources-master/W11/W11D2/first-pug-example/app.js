const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.all('*', (req, res) => {
	console.log(`Request method: ${req.method}`);
	console.log(`Request path: ${req.path}`);

	// res.send('Hello from the Pug template example app!');
	res.render('layout', { title: 'Welcome', heading: 'Home' });
});

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
