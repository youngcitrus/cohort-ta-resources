import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import { baseUrl } from './config';
import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';

const PrivateRoute = ({ component: Component, cProps, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/login' />
      : <Component {...props} {...cProps} />
  )} />
)

class App extends React.Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem('state-pokedex-token');
    this.state = {
      loaded: false,
      token,
      needLogin: !token,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.loadPokemon();
  }

  async loadPokemon() {
    const response = await fetch(`${baseUrl}/pokemon`, {
      headers: { Authorization: `Bearer ${this.state.token}`}
    });
    if (response.ok) {
      const pokemon = await response.json();
      this.setState({
        pokemon,
        needLogin: false,
      });
    } else {
      this.setState({
        needLogin: true
      });
    }
  }

  updateToken = token => {
    window.localStorage.setItem('state-pokedex-token', token);
    this.setState({
      needLogin: false,
      token
    });
    this.loadPokemon();
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login"
            render={props => <LoginPanel {...props} updateToken={this.updateToken} />} />
          <PrivateRoute path="/"
                        needLogin={this.state.needLogin}
                        component={PokemonBrowser}
                        cProps={{pokemon: this.state.pokemon, token: this.state.token}} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App;
