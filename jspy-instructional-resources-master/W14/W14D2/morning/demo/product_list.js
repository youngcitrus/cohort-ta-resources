// React -> React.createElement, creates virtual dom nodes
import 'https://unpkg.com/react@16/umd/react.development.js';

import ProductListItem from './product_list_item.js';

const ProductList = (props) =>
	React.createElement(
		// type
		'ul',
		// properties
		{ className: 'product-list' },
		// children

		props.items.map((item, i) => React.createElement(ProductListItem, { item, key: i }))
	);

export default ProductList;
