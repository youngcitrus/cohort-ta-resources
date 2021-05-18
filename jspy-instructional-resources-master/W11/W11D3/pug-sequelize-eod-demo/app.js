const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const { User } = require('./models');

const app = express();
const csrfProtection = csrf({ cookie: true });

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'pug');

function validationMiddleware(req, res, next) {
	const { username, email, age, password, confirmedPassword } = req.body;
	const ageAsNum = Number.parseInt(age, 10);
	const errors = [];

	if (!username) {
		errors.push('Please provide a username.');
	}

	if (!email) {
		errors.push('Please provide an email.');
	}

	if (!age) {
		errors.push('Please provide an age.');
	}

	if (age && (ageAsNum < 0 || ageAsNum > 120)) {
		errors.push('Please provide an age between 0 and 120');
	}

	if (!password) {
		errors.push('Please provide a password.');
	}

	if (password && password !== confirmedPassword) {
		errors.push('The provided values for the password and password confirmation fields did not match.');
	}

	req.errors = errors;
	next();
}

app.get('/', async (req, res) => {
	const users = await User.findAll();
	res.render('home', { users });
});

app.get('/create', csrfProtection, (req, res, next) => {
	res.render('create', {
		title: 'Create a user',
		errors: [],
		csrfToken: req.csrfToken()
	});
});

app.post('/create', csrfProtection, validationMiddleware, async (req, res) => {
	const { username, age, email, password } = req.body;
	const errors = req.errors;

	if (errors.length > 0) {
		res.render('create', {
			title: 'Create a user',
			username,
			email,
			age,
			csrfToken: req.csrfToken(),
			errors
		});
		return;
	}

	await User.create({ username, email, age, password });
	res.redirect('/');
});

app.listen(3000, () => console.log(`Listening on port 3000...`));
