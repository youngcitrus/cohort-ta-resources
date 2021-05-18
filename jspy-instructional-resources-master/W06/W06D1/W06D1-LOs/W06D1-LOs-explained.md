## HTTP (W6D1) - Learning Objectives

### HTTP
1. Match the header fields of HTTP with a bank of definitions.
    - Host: Root path of our URI (typically a domain like appacademy.io, could also be an IP address)
    - User-Agent: Information about which browser the request originated from
    - Referer: The URL that you're coming from (such as when you click a link to a new site)
    - Accept: What the client can receive. May be expansive to accept all kinds of data, or limited, such as only accepting `application/json`
    - Content-*: Defines details about the body, indicating what format it is in, such as `application/json` or `application/x-www.form-urlencoded`
    - Location: A server typically adds this to a response so that the client can perform a redirection
    - Expires: When the response should be considered stale and needs to be refetched. Often used to cache a response so that subsequent requests can load directly from the cache instead of hitting the server.
    - Set-Cookie: The server is telling the client to create/update a key/value pair in its cookies.

2. Matching HTTP verbs (GET, PUT, PATCH, POST, DELETE) to their common uses.
    - GET: Direct requests. Do not contain a body, simply asking for data.
    - PUT: Update a resource on the server. Contain the whole resource to be updated.
    - PATCH: Update a resource on the server. Does not need to have the whole resource, usually just the identifier and what fields are being updated.
    - POST: Creating a new resource on the server. Usually what is generated when we submit a form, with the form's data being passed in the body of the request.
    - DELETE: Destroy a resource on the server, such as removing a product, or logging out a user (destroying their session)

3. Match common HTTP status codes (200, 302, 400, 401, 402, 403, 404, 500) to their meanings.
    - 100s: Informational
    - 200s: Successful
        - 200 OK: received and fulfilled, typically with a body that has the requested data
    - 300s: Redirection
        - 302 Found: the resource has moved. We usually see this with a Location header, where a browser will automatically redirect the request to the new location.
    - 400s: Client Error
        - 400 Bad Request: General response that the server couldn't understand your request. Often seen with typos, if a more specific 404 is not issued.
        - 401 Unauthorized: The resource may exist, but you're not allowed to see it unless you are authorized. (Try logging in with valid credentials before sending the request again.)
        - 403 Forbidden: The resource may exist, but you're not allowed to see it, even if you are logged in. Can also be seen if you're trying to perform an action that is not allowed (such as creating a duplicate record). Maybe this is a resource that you need special permissions for, like admin access.
        - 404 Not Found: The resource doesn't exist. It may be that it hasn't been created, or that you just had a typo in what you were requesting.
    - 500s: Server Error
        - 500 Internal Server Error: The server tried to process your request, but something went wrong, typically there was some kind of runtime error in the server code due to your request.

4. Send a simple HTTP request to google.com
    - We can use netcat in the terminal to make a connection to a URL and send an HTTP request
    - `nc google.com 80` opens our connection to google.com
    - After we make our connection, we specify the three parts of an HTTP request:
        - Request line
        - Headers
        - Body
    - `GET / HTTP/1.1` creates the request-line, indicating our verb (GET), URI (/), and version (HTTP/1.1)
    - any other headers we would like (optional), such as `Accept: application/json`
    - body of the request (optional), such as `myKey=myValue`

5. Write a very simple HTTP server using ‘http’ in node with paths that will result in the common HTTP status codes.
```javascript
const http = require('http');

http.createServer(function(request, response) {
    if (request.url === '/200') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<h1>Hello, world! Status 200 OK!</h1>');
    } else if (request.url === '/403') {
        response.writeHead(403, { 'Content-Type': 'text/html' });
        response.write('<h1>This is Forbidden! Status 403 Forbidden!</h1>');
    } else {
        response.writeHead(404, { 'Content-Type': 'text/html' });
        response.write('<h1>What is that? Status 404 Not Found!</h1>');
    }
    response.end();
}).listen(8080, function() {
    console.log('Listening for requests on port 8080...');
})
```
