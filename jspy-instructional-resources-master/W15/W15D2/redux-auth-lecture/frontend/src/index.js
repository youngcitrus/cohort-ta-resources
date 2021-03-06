import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { thunks } from './store/movies';

const token = window.localStorage.getItem('REDUX_LECTURE_AUTH_TOKEN');

const store = configureStore({ auth: { token } });
store.dispatch(thunks.getMovies());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
