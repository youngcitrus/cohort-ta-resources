// React -> React.createElement, creates virtual dom nodes
import 'https://unpkg.com/react@16/umd/react.development.js';


import ProductList from './product_list.js';


const ProductSection = props => React.createElement(
  // type
  'section',
  // properties
  { className: 'product-section' },
  // children 
  React.createElement('h2', null, props.type),
  React.createElement(
    ProductList,
    { items: props.items}
  )
)



export default ProductSection;
