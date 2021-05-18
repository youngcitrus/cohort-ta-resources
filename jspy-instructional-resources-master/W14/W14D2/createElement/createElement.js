// Put the element tree in a variable
const navList = React.createElement(
	'ul',
	null,
	React.createElement('li', { className: 'selected' }, React.createElement('a', { href: '/pets' }, 'Pets')),
	React.createElement('li', null, React.createElement('a', { href: '/owners' }, 'Owners'))
);

// Get a DOM node for React to render to
const mainElement = document.querySelector('main');

// Give React the element tree and the target
ReactDOM.render(navList, mainElement);
