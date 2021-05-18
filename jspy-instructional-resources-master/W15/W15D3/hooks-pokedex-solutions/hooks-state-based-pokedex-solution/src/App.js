import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { baseUrl } from './config';
import { PrivateRoute } from './routesUtil';
import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';

const App = () => {
  const authToken = window.localStorage.getItem('state-pokedex-token');

  const [loaded, setLoaded] = useState(false);
  const [needLogin, setNeedLogin] = useState(!null);
  const [pokemon, setPokemon] = useState([]);
  const [token, setToken] = useState(authToken);

  useEffect(() => {
    setLoaded(true);
    loadPokemon(token);
  }, [token])

  const loadPokemon = async (authToken) => {
    const response = await fetch(`${baseUrl}/pokemon`, {
      headers: { Authorization: `Bearer ${authToken}`}
    });
    if (response.ok) {
      const pokemon = await response.json();
      setPokemon(pokemon);
      setNeedLogin(false);
    } else {
      setNeedLogin(true);
    }
  }

  const updateToken = authToken => {
    window.localStorage.setItem('state-pokedex-token', authToken);
    setNeedLogin(false);
    setToken(authToken);
    loadPokemon(authToken);
  };

  if (!loaded) {
    return null;
  }
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/login"
          render={props => <LoginPanel {...props} updateToken={updateToken} />}
        />
        <PrivateRoute
          path="/"
          component={PokemonBrowser}
          needLogin={needLogin}
          componentProps={{ pokemon, token }}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
