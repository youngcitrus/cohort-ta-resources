## Redux Learning Objectives

1. Describe the Redux data cycle
- Redux is a node package that facilitates a particular implementation of Flux, which itself is simply a pattern to follow to implement a unidirectional flow of data in our front-end applications. The generic Flux loop can be seen in this diagram:
![flux-loop](./flux-loop.png)
- The Redux adaptation of Flux can be seen in the following gif:
![redux-cycle](./redux.gif)
- If we start at the view, ie what the user sees and interacts with, we can describe the cycle as follows.
- An event is fired, such as a component mounting, or a user clicking on a button.
- There are two major scenarios that result from this event.
  1. If our application knows everything that it needs to reflect the change in our store, we can create an action and dispatch it. An example would be a change to the UI, such as showing a form. We don't need any outside information, we are simply updating our store to indicate that a form should now be displayed.
  2. If our application needs to perform additional outside functions, such as posting or fetching information to/from a database, we dispatch a function, which will be intercepted and invoked before it hits our reducers. The function will ultimately get its data and then dispatch its own action with any additional data that it needed.
- An action is dispatched to the reducers. An action is a POJO that at a minimum has a `type` key, but can also have additional data associated with it that is necessary to invoke a specific desired change in our store.
  - For example, logging out a user may not need any additional information, since we are simply removing information from our store that we already know the location of.
  - Adding a new pokemon in a pokedex application, however, would require us to have the information about the pokemon in the action object so that we can add this data to our store.
- The action is sent to our reducers. The reducers look at the `type` key and see if they need to respond to this particular action. If they do, they return a new object that represents their updated state. It's possible that only one reducer responds to a particular action `type` or that several reducers will need to respond to it, updating their 'slice' of state. This difference does not matter to us because every action will hit every reducer, with reducers that are not impacted by the action simply returning their previous state.
- After the action has hit all of our reducers and our state has been updated, the new state is passed along to each connected component. If the slice of state that that component was concerned with has changed, the props being passed in to the component from mapStateToProps will change. As we know from basic React, a change in props will result in a rerendering of the component, which will ultimately reflect any changes that our initial event triggered.

2. Explain a reducer
- A reducer is a function that is called each time an action is dispatched. The reducer receives an action and the current state as arguments and returns an updated state.
- Redux reducers are required to be pure functions of the dispatched action and the current state. This makes their behavior very predictable and allows their effects to potentially be reversed.
- A typical reducer has a switch statement with a case for each action `type` that will modify its slice of state, as well as a default case. For cases that modify, the reducer returns a new object that reflects the result of the action. For actions that the reducer is not concerned with, the default case simply returns the previous state.
```js
// The `state` parameter is assigned a default value of [] in this case.
// We will often assign a default value of [], {}, or some value such as { currentUser: null } that will be modified by actions dispatched to us.
const fruitReducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_FRUIT":
      return [...state, action.fruit];
    default:
      return state;
  }
};

export default fruitReducer;
```
- We return a new object when an action modifies our slice of state so that `react-redux` knows a change has occurred and can trigger a new mapping of the store's state to props that are concerned with it. If we were to modify the state object itself, it would assume since the new slice of state has the same object id as the old slice of state that no changes have occurred and will not remap and rerender. This ensuring that state is immutable is part of the optimization that makes the diffing algorithms so fast.

3. Configure a React application to use Redux
- There are a couple of different steps that we need to take in order to make sure our React app is able to use Redux.
  1. We need to create a store.
  - We can import the `createStore` function from `redux` and invoke it with arguments for our reducer, an initial state, and any middleware functions that we want to supply.
  - The reducer will be the top-level combined reducer associated with our store (assuming we have multiple composed reducers).
  - The middleware will most likely contain a thunk middleware to intercept functions that are dispatched (such as the one imported from `redux-thunk`), but can also contain other helpful middleware such as loggers that we'll want to easily see our store's state in development (such as the one imported from `redux-logger`)
  ```js
  import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
  import thunk from 'redux-thunk';
  import movies from './movies';
  import auth from './auth';

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const reducer = combineReducers({
    movies,
    auth,
  });

  const configureStore = (initialState) => {
    return createStore(
      reducer,
      initialState,
      composeEnhancers(applyMiddleware(thunk)),
    );
  };

  export default configureStore;
  ```
  2. Wrap our application in a `Provider` component, imported from `react-redux`.
  - This component allows us to connect nested components to our store to give them access to the store's state and dispatch function in order to invoke changes.
  - The `Provider` takes a `store` prop, which should be given the store that we created with `createStore`.
  ```js
  import { Provider } from 'react-redux';
  import configureStore from './store/configureStore';

  // configureStore was a function we created that takes in an object to represent the initial state and passes it along to redux's createStore function
  // In this example, we are setting an initial auth slice of state to have a token key pointing to the token we have in local storage. This way our store has access to our current user on first load if there was an auth token stored.
  const token = window.localStorage.getItem('REDUX_LECTURE_AUTH_TOKEN');
  const store = configureStore({ auth: { token } });

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
  ```
  3. Configure any reducers that are being combined for our store.
  - We generally want to compose our reducers so that we have one dedicated to each 'slice' of state. We may for example have a users reducer to track user data (not just our own), a movies reducer for movie data, an auth reducer to track the current user (auth token, details like the logged in user's name), etc.
  - Each reducer will need to take in the previous state as well as the action that is being dispatched
  ```js
  // It's good practice to set up constants for our types. If we use a variable and misspell it, we'll encounter an error. If we use a string in our switch cases, it simply won't match the misspelled string and go to our default case, which is a difficult error to debug.
  const UPDATE_EMAIL_VALUE = 'lecture/auth/UPDATE_EMAIL_VALUE';
  const UPDATE_PASSWORD_VALUE = 'lecture/auth/UPDATE_PASSWORD_VALUE';
  const UPDATE_TOKEN_VALUE = 'lecture/auth/UPDATE_TOKEN_VALUE';

  // Setting up our initial state for when we first create our reducer
  const initialState = {
    token: ""
  };

  function reducer(state = initialState, action) {
    switch (action.type) {
      // Each case that we are concerned with returns a new object with the updated values. We do not modify the original state
      case UPDATE_EMAIL_VALUE: {
        return {
          ...state,
          email: action.value,
        };
      }
      case UPDATE_PASSWORD_VALUE: {
        return {
          ...state,
          password: action.value,
        };
      }
      case UPDATE_TOKEN_VALUE: {
        return {
          ...state,
          token: action.value,
        };
      }
      // If our reducer is not concerned with this particular action, its type will not have matched any of the previous cases. We hit our default case and simply return the previous state, indicating that this slice of state was unaffected by the action.
      default: {
        return state;
      }
    }
  }

  export default reducer;
  ```
  4. Implement any action creators and thunks associated with our slices of state.
  - Action creators are functions that return an action object to be dispatched to our reducers. Actions are POJOs that have a `type` key that our reducers will iterate over to determine if they need to make some kind of change to their slice of state. The action can also have additional keys to provide extra information the reducer may need to make those changes (such as a token that we are trying to store for the current user, or an updated email address for us to change.)
  - Thunks are functions that we are dispatching that are going to be invoked before hitting our reducers. They are typically related to asynchronous calls, such as a request to our backend to get or post data to our database, or a request to a third-party API. After the request is made and our response is received, we are able to invoke our dispatch function again with the necessary information passed to an action creator so that we can hit our reducers and affect a change in our store.
  ```js
  // These are our action creators. They return action objects with at minimum a `type` key, but can also take additional data. In these cases, we're utilizing a `value` key for the updated value of each action (email, password, or token)
  const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
  const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });
  const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });

  // We are exporting these action creators to be used by our connected components
  export const actions = {
    updateEmailValue,
    updatePasswordValue,
    updateTokenValue,
  };

  // This is a thunk that makes an async fetch request to login a user.
  // When we get a response from our backend, we are using the response to dispatch an action creator (updateTokenValue) with the new data we just received. 
  const tryLogin = () => {
    return async (dispatch, getState) => {
      const { auth: { email, password } } = getState();
      const response = await fetch('http://localhost:8000/api/session', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      try {
        if (response.status >= 200 && response.status < 400) {
          const data = await response.json();
          dispatch(updateTokenValue(data.token));
          window.localStorage.setItem('REDUX_LECTURE_AUTH_TOKEN', data.token);
        } else {
          console.error('Bad response');
        }
      } catch (e) {
        console.error(e);
      }
    };
  };

  // We export our thunks to be used by our connected components
  export const thunks = {
    tryLogin,
  };
  ```
  5. Connect any components that need access to the store to retrieve data or dispatch actions.
  - We can use the `connect` function imported from `react-redux` in order to connect a React component to our Redux store. `connect` takes in arguments conventionally referred to as `mapStateToProps` and `mapDispatchToProps`.
    - `mapStateToProps` is a function that takes in `state` as an argument and returns an object with keys that we would like to have as props in our connected component. From the `state` argument we can access the store's state and properties that our reducers have set up.
    - `mapDispatchToProps` is a function that takes in `dispatch` as an argument and returns an object with keys that we would like to have as props in our connected component. The `dispatch` argument is our function that we can invoke to send our action object to our reducers.
  - The `connect` function that we invoke with `mapStateToProps` and `mapDispatchToProps` itself returns a function that we invoke (currying!) with the component that we would like to provide these props to. Take a look at the code snippet below for an example:
  ```js
  import React from 'react';
  import { connect } from 'react-redux';
  import { actions, thunks } from './store/auth';

  // The props that we are using update our values are being created in mapDispatchToProps and utilized in our component, in this case as event handlers.
  const LoginForm = props =>
    <>
      <div>
        <input onChange={props.updateEmailValue} type="email" placeholder="Email" required />
      </div>
      <div>
        <input onChange={props.updatePasswordValue} type="password" placeholder="Password" required />
      </div>
      <div>
        <button onClick={props.tryLogin}>Log in</button>
      </div>
    </>
  ;

  // Notice how we are keying into `auth` on our state object. This reflects the auth reducer that was set up at the top level of our application, with email as a key on this slice of state. Nesting reducers nests the values of those reducers under the keys that we specify in combineReducers. Remember that the return values of each of these reducers are POJOs, so nesting reducers just nests these objects.
  const mapStateToProps = state => {
    return {
      email: state.auth.email,
      password: state.auth.password,
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      updateEmailValue: event => dispatch(actions.updateEmailValue(event.target.value)),
      updatePasswordValue: event => dispatch(actions.updatePasswordValue(event.target.value)),
      tryLogin: () => dispatch(thunks.tryLogin()),
    };
  };

  export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
  ```

4. Use connected components to access Redux state
- Take a look at the above code block that utilizes the `connect` function.
- The main components in play are `connect` accepting `mapStateToProps` and `mapDispatchToProps` arguments, then being invoked with the component that we would like to connect to the Redux store.
- The keys that are created on the objects that each of these functions return are going to be available on the connected component's props.


5. Use composed reducers to simplify state management
- Composed reducers allow us to separate out our app's concerns into different slices, creating individual reducers for each aspect of data that our store is concerned with.
- We can import the `combineReducers` function from `redux` and invoke it with an object. The keys of the object set up the keys that will be created within our store and the values should point to the reducer that that particular slice of state is associated with. We'll often see them imported as the same name that we want our key to have, so the object can use the JavaScript shorthand of simply putting a reference to the reducer and the key will be made with the same name.
```js
import { combineReducers } from 'redux';
import authentication from './authentication';
import pokemon from './pokemon';

// We are creating keys of authentication and pokemon that point to their respective reducers. These keys will be at the top level of our store's state, so in our mapStateToProps, we would be able to access state.authentication.<<property_defined_in_authentication_reducer>>, for example
const reducer = combineReducers({
  authentication,
  pokemon,
});
```

6. Configure a React application to use the Redux development tools
- We can tell our Redux store to use the devtools compose function by grabbing it from the window with `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`. If the devtools don't exist in the browser (the user hasn't installed them), we can tell Redux to use the standard `compose` function imported from `redux`. We accomplish this by setting up a conditional to default to the compose function if the devtools are not preseent.
- The devtools are allowing us to track the status of our store and how our various actions have impacted it, so adding in this check can be very helpful for us during development.
- In general, this is boilerplate code. The only differences you'll commonly see between projects are the different reducers being used in combineReducers that are specific to your app as well as potentially adding on additional middleware, like a logger function to see the actions being dispatched and their impact on the store in the regular console.
```js
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import movies from './movies';
import auth from './auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducer = combineReducers({
  movies,
  auth,
});

const configureStore = (initialState) => {
  return createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(thunk)),
  );
};
```
