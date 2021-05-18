# Week 15 Learning Objectives - Redux, Hooks, and WebSockets

## Redux Learning Objectives
1. Describe the Redux data cycle
2. Explain a reducer
3. Configure a React application to use Redux
4. Use connected components to access Redux state
5. Use composed reducers to simplify state management
6. Configure a React application to use the Redux development tools

## React Hooks Learning Objectives
1. Create function components that use state and other React features.
2. Use the `useState` hook to manage a component's state.
3. Use the `useState` hook to set a default state, instead of setting the default state in a `constructor()` method.
4. Use the `useState` hook to update state, instead of the `setState()` method.
5. Use the `useEffect` hook to manage side effect operations (i.e. data fetching).
6. Use the `useEffect` hook in replacement of commonly used component lifecycle methods (`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`).
7. Understand how to optimize your application's performance by skipping `useEffect` calls.
8. Use the `useContext` hook to access a context object, instead of a `Context.Consumer` or the static `contextType` property.

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
