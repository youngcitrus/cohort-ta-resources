const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const path = require('path');
const { createServer } = require('http');
const WebSocket = require('ws');

const routes = require('./routes');
const { Item } = require('./db/models');

const app = express();

app.use(logger('dev'));
app.use(cors({ origin: true }));

// need following 2 middleware for sending data (post/put req)
app.use(express.json()); // recognize req as JSON object
app.use(express.urlencoded({ extended: false })); // recognize req as STR/ARR, no nested obj

app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

app.use((err, req, res, next) => {
	console.log('ERROR', err.status);
	res.status(err.status || 500);
	if (err.status === 401) {
		res.set('WWW-Authenticate', 'Bearer');
	}

	res.json({
		message: err.message,
		error: JSON.parse(JSON.stringify(err))
	});
});

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
	console.log('WEBSOCKET CONNECTION');
	ws.on('message', async (jsonData) => {
		console.log(`Processing incoming message ${jsonData}...`);

		const message = JSON.parse(jsonData);
		switch (message.type) {
			case 'new-item':
				addItem(message.data);
			default:
				ws.send(JSON.stringify({ type: 'error', data: `unknown message type "${message.type}" sent` }));
		}
	});

	const addItem = async ({ name, type, imgSrc, companyId }) => {
		let item = await Item.create({ name, type, imgSrc, companyId });

		const addItem = {
			type: 'add-new-item',
			data: item
		};
		const jsonAddNewItem = JSON.stringify(addItem);
		console.log(`Sending message ${jsonAddNewItem}...`);

		wss.clients.forEach((client) => {
			if (client.readyState === WebSocket.OPEN) {
				client.send(jsonAddNewItem);
			}
		});
	};

	ws.on('close', (e) => {
		console.log('Closing socket:', e);
	});
});

module.exports = server;
