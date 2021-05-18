// React -> React.createElement, creates virtual dom nodes
import 'https://unpkg.com/react@16/umd/react.development.js';



const ProductListItem = ({item}) => React.createElement(
  // type
  'li',
  // properties
  { className: 'product-list__item' },
  // children 
  React.createElement('img', { src: item.imgSrc }),
  React.createElement('label', null, item.name),
)

export default ProductListItem;