import 'https://unpkg.com/react@16/umd/react.development.js';
import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

import Navigation from './Navigation.js';
import PetDetails from './PetDetails.js';

const PetDetailPage = (props) =>
	React.createElement(
		'div',
		null,
		React.createElement(Navigation, null),
		React.createElement(PetDetails, { pet: props.pet })
	);

const target = document.querySelector('main');
const app = React.createElement(PetDetailPage, null);
ReactDOM.render(app, target);

(async () => {
	const url = 'https://polar-beach-08187.herokuapp.com/api/pets/2';
	const response = await fetch(url);
	if (response.ok) {
		const pet = await response.json();
		console.log(pet);

		const app = React.createElement(PetDetailPage, { pet });
		ReactDOM.render(app, target);
	}
})();

// Demo code for creating elements with React

// import 'https://unpkg.com/react@16/umd/react.development.js';
// import 'https://unpkg.com/react-dom@16/umd/react-dom.development.js';

// // The comments to each of the right of the
// // lines shows what React will do with the
// // stuff only after you call ReactDOM.render
// // with it.
// const Links = () => React.createElement(
//   'ul',                                  // <ul
//   { id: 'nav-links' },                   //  id="nav-links">
//   React.createElement(
//     'li',                                // <li
//     { className: 'is-selected' },        //  class="is-selected">
//     React.createElement(
//       'a',                               // <a
//       { href: 'https://appacademy.io' }, //  href="...">
//       'App Academy'                      //    App Academy
//     ),                                   // </a>
//   ),                                     // </li>
//   React.createElement(
//     'li',                                // <li>
//     null,
//     React.createElement(
//       'a',                               // <a
//       { href: 'https://aaonline.io' },   //  href="...">
//       'a/A Open',                        //  a/A Open
//     ),                                   // </a>
//   ),                                     // </li>
// );                                       // </ul>

// const HelloWorld = () => React.createElement(
//   'h1',
//   null,
//   'Hello, programmers',
// );

// // Creates the HelloWorld first and, then, creates
// // the Links
// const AllTogether = () => React.createElement(
//   'div',
//   null,
//   React.createElement(HelloWorld, null),
//   React.createElement(Links, null),
// );

// const target = document.querySelector('main');
// const app = React.createElement(AllTogether, null);
// ReactDOM.render(app, target);
