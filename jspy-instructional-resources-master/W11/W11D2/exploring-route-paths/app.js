const express = require('express');

const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
	const productPaths = [ '/product/1', '/product/2', '/product/asdf' ];

	const productsPaths = [ '/products', '/our-products', '/product', '/prodcts', '/productts', '/productos' ];

	res.render('index', { productPaths, productsPaths });
});

app.get('/product/:id(\\d+)', (req, res) => {
	const productId = parseInt(req.params.id, 10);

	res.send(`Product ID: ${productId}`);
});

// app.get('/*produ?ct+s?', (req, res) =>  {
//   res.send('Products');
// })

// app.get(/^\/((our-)?produ?ct{1,2}s?|productos)\/?$/i, (req, res) => {
// 	res.send('Products');
// });

app.get([ /^\/(our-)?produ?ct{1,2}s?\/?$/i, '/productos' ], (req, res) => {
	if (!req.path.toLowerCase().startsWith('/products')) {
		return res.redirect('/products');
	}

	res.send('Products');
});

const port = 8081;

app.listen(port, () => console.log(`Listening on port ${port}...`));
