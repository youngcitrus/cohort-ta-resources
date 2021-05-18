import { Route, Switch, NavLink } from 'react-router-dom';

import Home from './components/Home';
import Stocks from './components/Stocks';
import { movies } from './data/movieData';

import Movies from './components/Movies';

function App() {
  return (
    <div className='main'>
      <h1>App Component</h1>
      <nav className='comp nav'>
        <ul>
          <li>
            <NavLink activeClassName='custom' exact to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink activeClassName='custom' to='/stocks'>Stocks</NavLink>
          </li>
          <li>
            <NavLink activeClassName='custom' to='/movies'>Movies</NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route path='/stocks'>
          <Stocks />
        </Route>
        <Route path='/movies'>
          <Movies movies={movies}/>
        </Route>
        <Route path='/'>
          Page not found
        </Route>
        </Switch>
    </div>
  );
}

export default App;
