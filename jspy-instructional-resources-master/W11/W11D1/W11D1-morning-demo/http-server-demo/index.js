const http = require('http'); // The http library is standard in Node, we just have to require it
const { readFile } = require('fs').promises; // Using the .promises key uses the asynchronous readFile
const path = require('path'); // Similar to 'http', 'path' is standard to Node

const server = http.createServer(async (req, res) => {
	const ext = path.extname(req.url); // '/dog.jpg' => '.jpg'

	let content;
	if (req.method === 'POST') {
		let bodyContent = '';
		for await (let chunk of req) {
			bodyContent += chunk;
		}
		// 'my-input=In+this+box%3&another-input=Yes%2C+this+box%2C+here.'
		const keyValuePairs = bodyContent
			.split('&') // ['my-input=In+this+box%3', 'another-input=Yes%2C+this+box%2C+here.']
			.map((keyValuePair) => keyValuePair.split('=')) // [['my-input', 'In+this+box%3'], ['another-input', 'Yes%2C+this+box%2C+here.']]
			.map(([ key, value ]) => [ key, value.replace(/\+/g, ' ') ]) // [['my-input', 'In this box%3'], ['another-input', 'Yes%2C this box%2C here.']]
			.map(([ key, value ]) => [ key, decodeURIComponent(value) ]) // [['my-input', 'In this box?'], ['another-input', 'Yes, this box, here.']]
			.reduce((acc, [ key, value ]) => {
				acc[key] = value; // { 'my-input': 'In this box?', 'another-input': 'Yes, this box, here.' }
				return acc; // We have to return acc to make sure we use the updated value for the next iteration (adding in new key/value pairs for each iteration)
			}, {}); // This {} is the starting value of acc (the accumulator). It's allowing us to make a key/value pair for each inner array that we are destructuring.
		console.log(keyValuePairs);
		// const [fieldName, encodedFieldValue] = bodyContent.split('=');
		// const spacesFieldValue = encodedFieldValue.replace(/\+/g, ' ');
		// const fieldValue = decodeURIComponent(spacesFieldValue);
		content = `<h1>I got your request</h1>`;
		for (let [ key, value ] of Object.entries(keyValuePairs)) {
			content += `<p>You sent ${key} with the value ${value}</p>`;
		}
		content += `<a href="/">GO BACK!</a>`;
		res.setHeader('Content-Type', 'text/html');
	} else if (ext === '.jpg') {
		content = await readFile('./dog.jpg');
		res.setHeader('Content-Type', 'image/jpeg');
	} else {
		content = await readFile('./example.html');
		res.setHeader('Content-Type', 'text/html');
	}

	res.statusCode = 200;
	res.end(content);
});

const port = 8081;

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
