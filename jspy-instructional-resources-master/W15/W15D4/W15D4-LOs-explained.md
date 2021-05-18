## WebSockets Learning Objectives

### Client-Side WebSockets
1. Use the WebSockets API to create a new WebSocket connection to a server
- We can create a new connection to a WebSocket server by creating a new instance of `WebSocket`, passing in a URL that we want to connect to.
```js
const ws = new WebSocket('ws://localhost:8080');
```

2. Create a WebSocket `onopen` event handler function to detect when the connection has been opened
- The `onopen` event handler of our socket can be assigned a callback function that takes in the event as an argument. This can also be written as `addEventListener('open', event => {...})` invoked on our socket.
- Remember that assigning the `on<<eventname>>` like our first example overwrites any other event listeners for that event, so only one handler can exist this way. Using `addEventListener` allows for multiple event handlers to be added to the same event, which can be a useful difference in implementation.
```js
ws.onopen = (e) => {
  console.log(`Connection open: ${e}`);
};
// or
ws.addEventListener('open', e => {
  console.log(`Connection open: ${e}`);
})
```

3. Create a WebSocket `onmessage` event handler function to detect and process messages sent by the server
- We can use the `onmessage` event handler of our socket or add an event listener for the `message` event.
- The captured event will have a `data` key that is the message that was sent from the server. This data is in JSON so it will need to be parsed in order to interact with the object that in represents.
```js
ws.onmessage = (e) => {
  // The event has a data key with the message sent from the server.
  // This is the JSON that needs to be parsed
  const parsedMessage = JSON.parse(e.data)
  // Now that the message has been parsed, it will be in the format of the object the server created.
  // This format will depend entirely on your own implementation, but it can be helpful to have set up a `type` key to indicate what kind of message was being transmitted and how the client should respond to it, as well as a data key that houses the actual content of the message that was transmitted.
  // Similarly to how Redux reducers switch over the action type, if we follow this format we can switch over the message type to determine what we need to do with the content of the message.
  switch (message.type) {
    case 'type-1':
      // do something
      break;
    case 'type-2':
      // do something
      break;
    default:
      throw new Error (`Unknown message type: ${message.type}`);
  }
};

// or

ws.addEventListener('message', e => {
  // message event handler
})
```

4. Create a WebSocket `onerror` event handler function to detect when an error has occurred
- We can use the `onerror` event handler of our socket or add an event listener for the `error` event.
```js
ws.onerror = (e) => {
  console.error(`WebSocket Error: ${e}`);
};
// or
ws.addEventListener('error', e => {
  console.error(`WebSocket Error: ${e}`);
})
```

5. Use the WebSocket `send()` method to send messages to the server
- We can use the `send` method to on the socket to send a message to our server.
- The `send` method takes an string, so if we want to send complex information we can first convert it to JSON.
```js
const message = JSON.stringify({
  type: 'add-new-player',
  data: {
    playerName: 'Bob'
  }
});
ws.send(message);
```

6. Recall that WebSocket message data can be sent as JSON formatted string
- Since `send` requires us to pass a string (or a Blob or ArrayBuffer, but we won't need to get into those at this point), we can convert complex objects into strings using `JSON.stringify(<<object>>)`

7. Recall that WebSocket messages usually have a "type" associated with them so the client can determine how to process them
- Including a `type` makes it easy for the server to know what to do with the message that it receives. I like to think of these `types` as a cross between a Redux action's type and an http server's routes. Our Redux reducers iterate over types to see if the reducer needs to respond to the action. Since we are sending all of our messages to the same location on the backend, sending a message with a different type is similar to sending a regular http request to a different route.
- If we have a `type` of `add-new-player` our server will be able to determine that the data associated with the message should be used to create a new Player instance. If the `type` is `select-game-square`, the server can determine that the data represents a move that the current player is trying to make in our game.

8. Use the WebSocket `close()` method to close the connection to the server
- We can invoke a socket's `close` method to send a `close` event to our server.
- The method does not need to take any arguments since it is simply emitting an event to the server with no data associated with it.
- It is common for us to invoke the close method in our cleanup function for a React component's `useEffect` hook.
```js
const [username, setUsername] = useState('');
const webSocket = useRef(null);

useEffect(() => {
  if (!username) {
    return;
  }

  const ws = new WebSocket('ws://localhost:8080');
  
  // event handlers for onopen, onmessage, onerror, onclose, etc.
  
  webSocket.current = ws;

  // We are using a reference to ws here instead of ws directly
  // In this particular case, we could have used ws instead of the webSocket reference we created since this function closes over the ws variable
  // The reason we are setting up the reference with useRef is so that we can refer to this websocket in other `useEffect` hooks. We are using the reference to be consistent with the syntax used between the different hooks.
  return function cleanup() {
    if (webSocket.current !== null) {
      webSocket.current.close();
    }
  };
}, [username]);
```

9. Create a WebSocket `onclose` event handler function to detect when the connection to the server has been closed
- We can use the `onclose` event handler of our socket or add an event listener for the `close` event.
- The event handler takes in the event as an argument. We generally want to perform cleanup with our component or application state when the socket closes
```js
ws.onclose = (e) => {
  console.log(`Connection closed: ${e}`);
  webSocket.current = null; // Removing the reference to the websocket that no longer exists
  setUsername(''); // Resetting the username that our app's state is tracking
  setMessages([]); // Resetting the messages that our app's state is tracking
};
```

### Server-Side WebSockets
1. Use the `ws` package to create a standalone WebSocket server
- We can use the `ws` package's `Server` function to set up a standalone WebSocket server. We can invoke this function with an object that specifies the port that we would like to run on.
```js
const WebSocket = require('ws');
 
const wss = new WebSocket.Server({ port: 8080 });
```

2. Use the `ws` package to create a WebSocket server that shares a Node.js http server with an Express application
- To share an http server with an express application, instead of passing in the port that we are creating the standalone server on we can pass in a reference to the http server that we have created.
- We can additionally pass in an option that specifies a path that our WebSocket server should respond to instead of a generic root.
- You may see a clientTracking boolean specified to indicate that we want to keep track of each client that has connected to us. The default value is `true`, so it will often be omitted.
```js
const express = require('express');
const https = require('https');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ 
  server,               // mount our WebSocket server on top of our http server
  path: '/ws',          // specifies a root to respond to requests from instead of the default `/`
  clientTracking: true  // keep track of each client in our server's `clients` array (`true` is default)
})
```

3. Create a `connection` event handler listener method to detect when a client has connected to the WebSocket server
- We can listen for the `connection` event on our WebSocket server using the `on` method. The callback to this event captures the socket that connects us to our client.
- The socket that we capture can then listen for events that occur within this connection (such as new messages or the closing of the connection).
```js
wss.on('connection', socket => {
  // code to run after connection
  // potentially add event listeners on `socket` 
  socket.on('message', jsonData => {
    // The client has sent a message to us
    // We can parse the message and then interact with it however we need to on the server
    const parsedData = JSON.parse(jsonData);
    // At this point parsedData will be the object that we went from the client-side, so we can access any keys that we set up there.
    // A common convention is to have a `type` key to tell the server what the data represents, as well as a `data` key for the actual data being transferred
    // In this way, we could have a switch statement to interact with the data based on the `type`, a pattern we've seen previously in our Redux reducers.
  })
})
```

4. Create a `close` event handler listener method to detect when a client has closed the connection to the WebSocket server
- Within our `connection` event handler, in addition to the `message` event, we can also have our socket listen for a `close` event.
- We can perform any kind of cleanup that we need to do when a socket has been closed here (if we are playing a multiplayer game, we could close the socket for the second player if the first one leaves, for example)
```js
wss.on('connection', socket => {
  // ... additional code, such as a `message` event handler
  socket.on('close', event => {
    // perform cleanup tasks, such as closing other sockets, recording a signoff time of a user, etc.
  })
})
```

5. Use the WebSocket `send()` method to send a message to a client
- If we have a reference to an open socket, we can broadcast a message using the `send` method on the socket.
- The `send` method takes in a JSON-formatted message as the first argument and an optional error handler callback as the second argument to be invoked in case sending the message results in an error.
```js
const message = JSON.stringify({
  type: 'update-game',
  data: {
    currentPlayer: {
      playerName: 'Bob'
    },
    squareValues: ['', '', '', '', '', '', '', '', ''],
    winner: null
  }
})

socket.send(message, (err) => {
  if (err) {
    console.error(err);
  }
});
```
- It is also common for us to want to broadcast a message to all clients that we are tracking. We can iterate over our socket's `clients` array and send a message to each one:
```js
wss.clients.forEach(clientSocket => {
  clientSocket.send(message)
})
```
