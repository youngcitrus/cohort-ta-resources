const http = require('http');
const server = http.createServer(function(req, res) {
    if (req.url === "/OK") {
        console.log("Inbound 'OK' request being processed...");
        res.writeHead(200);
        res.end();
    } else {
        console.log('Content not here!')
        res.writeHead(404);
        res.end();
    }
});

const port = 3000;
server.listen(port, function() {
    console.log(`Listening at port ${port}!`);
});