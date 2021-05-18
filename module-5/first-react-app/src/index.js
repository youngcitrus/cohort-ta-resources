import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Users from './components/Users';
import Profile from './components/Profile';
import History from './components/History';
import { BrowserRouter, Route, NavLink, Switch } from 'react-router-dom';
const Root = () => {
  const handleClick = () => {
    console.log('Thanks for clicking!')
  };
  return (
    <BrowserRouter>
      <div>
        <NavLink exact to="/" activeStyle={{ fontWeight: "bold" }}>App</NavLink> <br />
        <NavLink activeClassName="red" to="/users">Users</NavLink> <br />
        <NavLink activeClassName="blue" to="/hello">Hello</NavLink> <br />
        <NavLink activeClassName="green" to="/users/1">Andrew's Profile</NavLink> <br />
        <NavLink exact to="/" onClick={handleClick}>App with click handler</NavLink> <br />
        <History></History>
        <Switch>
          <Route exact path="/">
            <App />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
          <Route path="/users/:userId">
            <Profile />
          </Route>
          <Route>
            <h1>404: Page not found</h1>
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
