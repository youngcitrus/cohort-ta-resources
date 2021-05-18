// React -> React.createElement, creates virtual dom nodes
import 'https://unpkg.com/react@16/umd/react.development.js';

import ProductSection from './product_section.js';

const App = (props) =>
	React.createElement(
		// type
		'div',
		// properties
		{ className: 'App123' },
		// children
		React.createElement('h1', null, 'Product Sections'),
		React.createElement(ProductSection, { items: props.fruits, type: 'Fruits' }),
		React.createElement(ProductSection, { items: props.vegetables, type: 'Vegetables' })
	);

export default App;
