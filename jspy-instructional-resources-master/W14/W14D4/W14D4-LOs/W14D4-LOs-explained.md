## React Router Objectives

1. Use <BrowserRouter> to provide your application access to the `react-router-dom` library.
- The `BrowserRouter` component will pass down props related to the user's url, history, and path (including parameters), to any nested component.
- After adding `react-router-dom` to our application (`npm install react-router-dom@^5.1.2`, or similar/newer version), we can import the `BrowserRouter` component and nest our app's component inside of it:
```js
import { BrowserRouter } from 'react-router-dom';
import Rainbow from './components/Rainbow';

const Root = () => (
  <BrowserRouter>
    <Rainbow />
  </BrowserRouter>
);
```

2. Use <Route> to connect specific URL paths to specific components you want rendered.
- Inside of our `BrowserRouter` (most likely inside of our main component that we nested), we can use `Route` components in order to only render components when we have navigated to a specific path.
- `Route` takes specific props to indicate what to render and when:
  - `component`: Used to reference the component that is to be rendered at the specified path
  - `path`: Specifies what path the component will be rendered at (such as `/` or `/users`)
  - `exact`: An optional flag. If it is present, the component will only be rendered at the exact path specified. If it is not present. The component will be rendered as long as the user's path begins with the provided `path` argument.
  - `render`: Can be used instead of the `component` prop. One main difference between the two is that `render` takes in a callback function to be invoked instead of a component directly. The other main difference is that whenever a `Route` renders, a `component` will be remounted, but a function passed to `render` will just be updated and rerendered. `render` can also be useful if we want to pass props to the component our route is rendering, since we can have our callback function return the component with the props passed in.
```js
import { BrowserRouter, Route } from 'react-router-dom';
import App from './App.js';
import Users from './Users.js';

const Root = () => {
  const users = {
    1: { name: 'Andrew' },
    2: { name: 'Raymond' }
  };

  return (
    <BrowserRouter>
      {/* The BrowserRouter can only have one child, so we wrapped our Routes in a div */}
      <div>
        <h1>Hi, I'm Root!</h1>
        {/* The `exact` flag is ensuring our App component is only rendered at `/` */}
        {/* If we didn't include it, App would be rendered at each route that starts with `/` (ie every page) */}
        <Route exact path="/" component={App} />
        {/* Using render instead of component because what we want to render is so simple */}
        <Route path="/hello" render={() => <h1>Hello!</h1>} />
        {/* Using render instead of component because we want to pass a `users` prop to Users */}
        <Route path="/users" render={() => <Users users={users} />} />
        {/* We want to have access to the userId param captured by the Route, so we are
        spreading our props that Route creates and giving Uers access to all of them. */}
        {/* If we only wanted Users to have access to the userId and not everything that Route creates,
        we could pass it specifically: <Users users={users} userId={props.match.params.userId} /> */}
        <Route path="/users/:userId" render={(props) => <Users users={users} {...props} />} />
      </div>
    </BrowserRouter>
  );
};
```

3. Use <Switch> to wrap several Route elements, rendering only one even if several match the current URL.
- By wrapping our `Routes` in a `Switch` component, we can ensure that only one `Route` will be rendered.
- Only the first `Route` that has a matching `path` will be rendered, even if later routes also match.
- Since order matters in a `Switch` component, we can set up our routes to perform such actions as responding to more generic routes down the line, or providing a 404 page if none of our routes matched.
```js
import { Route, Switch } from 'react-router-dom';

// Other component code removed for brevity

<Switch>
  <Route exact path="/users" render={() => <Users users={users} />} />
  <Route path="/hello" render={() => <h1>Hello!</h1>} />
  <Route exact path="/" component={App} />
  <Route render={() => <h1>404: Page not found</h1>} />
</Switch>
```

4. Use React Router's `match` prop to access route path parameters.
- We can use route *wildcards* in order to capture values from the path that the user has navigated to.
- In React's routes, we can use a `:` to indicate that we are capturing the value as a parameter.
  - The path `/users/:userId/posts` will capture the value between `/users/` and `/posts` and make it available to us under the `match` prop that `BrowserRouter` creates for us.
  - If we navigate to `/users/7/posts`, the component that was rendered by our `Route` will be given access to `7` through `props.match.params.userId`
```js
// ./src/App.js

// App component code omitted for brevity
// We want to make sure we pass all of the props that BrowserRouter gave us to Profile, in addition to the new `users` prop
  <Route path="/users/:userId" render={(props) => <Profile users={users} {...props} />} />
```
```js
// ./src/Profile.js
import React from "react";

const Profile = ({ users, match: { params } }) => {

  // In a real-world scenario, you'd make a call to an API to fetch the user,
  // instead of passing down and keying into a `users` prop.

  // If we hadn't destructured our props above, we would access our userId through props.match.params.userId and users through props.users
  // Overall we would have
  // const user = props.users[props.match.params.userId]
  // You can see from this how destructuring can make your code more clear

  const user = users[params.userId];

  return (
    <div>
      The user's id is {params.userId} and the user's name is {user.name}.
    </div>
  );
};

export default Profile;
```
- `match` also gives us access to a couple of other useful values:
  - `url`: The url that matched the specified route, ie `/users/1`
  - `path`: The path that was matched without wildcards filled in, ie `/users/:userId`
  - `isExact`: a boolean that indicates if this component was rendered because our path was exactly matching the specified route path, ie for a `Route` with path `/users/:userId`, would return true `true` if our user is at `/users/1`, but false if they are at `/users/1/posts`

5. Use <Link> or <NavLink> to create links with absolute paths to routes in your application (like `/users/1`).
- In order for us to make a link to a path within our application, we can import either `NavLink` or `Link` from `react-router-dom`.
- Either component takes in a `to` prop that indicates where we would like to send the user. The content between the open and close tags is the text to be displayed in the link.
- A `NavLink` is different from a `Link` in that it will apply a class name (default is `active`) to a link if the user's location currently matches the `to` path.
  - We can specify that we only want this class to be added at the exact route by adding in the `exact` flag
  - We can alter what class gets added by setting the `activeClassName` prop. In the below example we added `violet` instead of the default `active` class when navigating to `/violet` (maybe we already have a `violet` CSS class selector that changes the color and font-weight for some `violet` components, for example).
```js
import { NavLink, Link } from 'react-router-dom';

<NavLink exact to="/red">Red</NavLink>
<NavLink to="/green">Green</NavLink>
<NavLink exact to="/blue">Blue</NavLink>
<NavLink activeClassName="violet" to="/violet">Violet</NavLink>
```

6. Use <Redirect> to redirect a user to another path (i.e. a login page when the user is not logged in).
- A `Redirect` component, imported from `react-router-dom`, will automatically push a user to a different location.
- This functionality is mostly used with a conditional to determine whether a user should have access to some component.
- In the below example, we are only rendering our `Home` component when our props indicate that we are logged in. If we aren't logged in, we are sending the user to the login page.
```js
import { Route, Redirect } from `react-router-dom`;

import Home from './Home.js';

// Component details omitted for brevity

<Route
  exact path="/"
  render={() => (this.props.currentUser ? <Home /> : <Redirect to="/login" />)}
/>
```

7. Use React Router's `history` prop to update a browser's URL programmatically.
- In addition to links, we can react to events happening by pushing a user to a new location.
- We can use the `push` or `replace` methods on `history` to send the user to a new location.
  - `push` adds the new location to the history stack
  - `replace` changes the current location in the stack to the new one, acting as if the user was never here if they use the back button on their browser.
```js
addNewItem = (item) => {
  // If the user tries to add a tomato the the Vegetable section, push them over to the Fruit section, otherwise, add the item like usual
  if (item.name.toLowerCase() === 'tomato' && this.props.type === 'Vegetable') {
    this.props.history.push('/fruits');
  } else {
    let newItems = this.state.items.concat(item);
    this.setState({ items: newItems });
  }
};
```

8. Understand what nested routes are.
- Nested routes are routes that are created within other components, after our application has already been initialized.
- We are not bound to creating all of our routes in one location, but instead can build our routes within other components, utilizing the path that the user has navigated to.
- If we have a route to `/users/:userId` that renders a Profile component, we can have our Profile component render routes to `/users/:userId/posts` and `/users/:userId/photos`

9. Be able to use React Router to create and navigate nested routes.
- Within our Profile component (which is rendered at `/users/:userId`), we can make nested routes to our UserPosts and UserPhotos components. This will allow us to render these components within our Profile component based on our url.
```js
const Profile = (props) => {
  // Custom call to database to fetch a user by a user ID.
  const user = fetchUser(props.match.params.userId);
  const { name, id } = user;

  return (
    <div>
      <h1>Welcome to the profile of {name}!</h1>

      {/* Links to a specific user's posts and photos */}
      <Link to={`/users/${id}/posts`}>{name}'s Posts</Link>
      <Link to={`/users/${id}/photos`}>{name}'s Photos</Link>

      {/* Routes to a specific user's posts and photos */}
      <Route path='/users/:userId/posts' component={UserPosts} />
      <Route path='/users/:userId/photos' component={UserPhotos} />
    </div>
  );
};
```

10. Know how to use the React Router `match` prop to generate links and routes.
- By utilizing our match's `url` and `path`, we can build out nested routes and links based on our current location without having to hard code those paths.
- If our Profile component is rendered at multiple urls, this also allows our nested routes to maintain the beginning path no matter where it was rendered from.
```js
// Destructure `match` prop
const Profile = ({ match: { url, path, params }) => {

  // Custom call to database to fetch a user by a user ID.
  const user = fetchUser(params.userId);
  const { name, id } = user;

  return (
    <div>
      <h1>Welcome to the profile of {name}!</h1>

      {/* Replaced `/users/${id}` URL with `props.match.url` */}
      <Link to={`${url}/posts`}>{name}'s Posts</Link>
      <Link to={`${url}/photos`}>{name}'s Photos</Link>

      {/* Replaced `/users/:userId` path with `props.match.path` */}
      <Route path={`${path}/posts`} component={UserPosts} />
      <Route path={`${path}/photos`} component={UserPhotos} />
    </div>}
  );
};
```
