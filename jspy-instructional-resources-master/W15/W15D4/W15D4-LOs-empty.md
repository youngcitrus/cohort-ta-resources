## WebSockets Learning Objectives
### Client-Side WebSockets
1. Use the WebSockets API to create a new WebSocket connection to a server
2. Create a WebSocket `onopen` event handler function to detect when the connection has been opened
3. Create a WebSocket `onmessage` event handler function to detect and process messages sent by the server
4. Create a WebSocket `onerror` event handler function to detect when an error has occurred
5. Use the WebSocket `send()` method to send messages to the server
6. Recall that WebSocket message data can be sent as JSON formatted string
7. Recall that WebSocket messages usually have a "type" associated with them so the client can determine how to process them
8. Use the WebSocket `close()` method to close the connection to the server
9. Create a WebSocket `onclose` event handler function to detect when the connection to the server has been closed

### Server-Side WebSockets
1. Use the `ws` package to create a standalone WebSocket server
2. Use the `ws` package to create a WebSocket server that shares a Node.js `http` server with an Express application
3. Create a `connection` event handler listener method to detect when a client has connected to the WebSocket server
4. Create a `close` event handler listener method to detect when a client has closed the connection to the WebSocket server
5. Use the WebSocket `send()` method to send a message to a client
