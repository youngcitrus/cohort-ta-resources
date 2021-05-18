// React -> React.createElement, creates virtual dom nodes
import 'https://unpkg.com/react@16/umd/react.development.js';

// ReactDOM -> ReactDOM.render, puts stuff on page
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

import App from './App.js';

let fruits = [ { name: 'banana', imgSrc: './images/banana.jpg' }, { name: 'apple', imgSrc: './images/apple.jpg' } ];

const vegetables = [
	{ name: 'broccoli', imgSrc: './images/broccoli.jpg' },
	{ name: 'carrot', imgSrc: './images/carrot.jpg' }
];

const target = document.querySelector('main');
const app = React.createElement(App, { fruits, vegetables });

ReactDOM.render(app, target);

// to demonstrate how components are re-used as data is added
// for example purposes only

document.querySelector('.apple').addEventListener('click', () => {
	fruits.push({ name: 'apple', imgSrc: './images/apple.jpg' });

	// react takes existing virtual DOM from last time it rendered
	// compares to new thing trying to render
	// if anything has changed, updates
	ReactDOM.render(React.createElement(App, { fruits, vegetables }), target);
});

// to run project
// python3 -m http.server
