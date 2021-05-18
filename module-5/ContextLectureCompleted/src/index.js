import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { LanguageProvider } from './context/LanguageContext';

const Root = () => {
  return (
    <LanguageProvider>
      <App>
        <h1>Text</h1>
      </App>
    </LanguageProvider>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
