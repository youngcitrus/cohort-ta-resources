const http = require('http');
const { readFile } = require('fs').promises;

const server = http.createServer(async (req, res) => {
	if (req.method === 'GET' && req.url === '/') {
		const homeFilePath = './homepage.html';
		const homeFileContents = await readFile(homeFilePath);
		res.statusCode = 200;
		res.setHeader('Content-Type', 'text/html');
		res.end(homeFileContents);
		return;
	}

	res.statusCode = 404;
	res.setHeader('Content-Type', 'text/plain');
	res.end('NOT FOUND');
});

const port = 8081;

server.listen(port, () => {
	console.log(`Server running on port ${port}`);
});

let resource;
req.baseUrl.replace(/\/(\w+)/, (match) => {
	console.log(match);
	resource = match;
	return match;
});

let url = '/cats/other/path.jpg';
let resource = url.match(/^\/(\w+)/)[1];
console.log('resource', resource);
