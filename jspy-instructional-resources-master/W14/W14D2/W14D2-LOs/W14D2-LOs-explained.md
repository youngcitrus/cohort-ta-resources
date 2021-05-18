## Basic React Learning Objectives

1. Explain how React uses a tree data structure called the "virtual DOM" to model the DOM
- React mirrors the DOM's tree structure with nodes that represent the HTML elements that are being rendered. When changes to these virtual elements occur, React is able to easily match them up with the HTML that needs to be changed in the actual DOM.

2. Show how to use `React.createElement` to create virtual DOM nodes
- React.createElement takes in three types of arguments. First is the type of element we are trying to make (the HTML tag passed as a string or a reference to another component). The second is the properties that we are passing to the newly created element. Finally we can specify children that this element should have.
```js
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
```
The a', null, 'Hello World!'});
```

4. Use `React.createElement` to create elements based on components
```js
// Here we are creating a ProductSection component (defined elsewhere), passing in props for items and type, with no children defined directly here
React.createElement(ProductSection, { items: props.fruits, type: 'Fruits' })
```

5. Use `ReactDOM.render` to have React render your virtual DOM nodes into the actual Web page
- ReactDOM.render takes in two arguments: the element that we would like to render and a a reference to the HTML element that we are taking over and replacing the contents of.
```js
// Reference to our main tag that we are taking over
const target = document.querySelector('main');
// The element that we are creating and placing inside of main
const app = React.createElement(App, { fruits, vegetables });

ReactDOM.render(app, target);
```

6. Use `ReactDOM.render` to update existing DOM
- React keeps track of what it has already rendered with its virtual DOM. When we rerender, it compares what we had previously created with the new content. If anything is new or changed, it will implement those changes in the DOM.
- In this example, we had already rendered our App component. Clicking the button with class `apple` adds a new apple item into our fruits array. Since we want the new apple to be rendered as well, we invoke render with the App component and the updated props. React will see that we only have one new element to create. It won't regenerate the entire HTML, just add in the new element.
```js
document.querySelector('.apple').addEventListener('click', () => {
	fruits.push({ name: 'apple', imgSrc: './images/apple.jpg' });

	// react takes existing virtual DOM from last time it rendered
	// compares to new thing trying to render
	// if anything has changed, updates
	ReactDOM.render(React.createElement(App, { fruits, vegetables }), target);
});
```

7. Use the second argument to `React.createElement` to pass data to your components through the conventionally-named `props` argument
- When we create our ProductSection component, we pass items and type properties to the component as the second argument.
```js
// Here we are creating a ProductSection component (defined elsewhere), passing in props for items and type, with no children defined directly here
React.createElement(ProductSection, { items: props.fruits, type: 'Fruits' })
```
- In the ProductSection component, we traditionally capture the properties that we passed in as the `props` parameter. We can reference the different keys that we created for each property anywhere within this component by using `props.propertyName`. 
```js
const ProductSection = props => React.createElement(
  // type
  'section',
  // properties
  { className: 'product-section' },
  // children 
  React.createElement('h2', null, props.type), // The type that we passed down from our App component
  React.createElement(
    ProductList,
    { items: props.items} // The items that we passed down from our App component
  )
)
```
- You may also see props destructured, such as: 
```js
const ProductSection = {type, items} => React.createElement(
  // code removed for brevity
  React.createElement('h2', null, type), // we can now use type instead of props.type
   React.createElement(
    ProductList,
    { items: items} // We can now use items instead of props.items
  )
);
```

8. Use the second argument of `React.createElement` to specify attributes to render on actual DOM nodes
```js
// Here we are creating an h1 tag with a className property and the content of 'Hello World!'
// We have to use className instead of class because class is a key word in JavaScript, so React maps the className key to the class property for us.
// We can similarly assign any attributes in this way, such as the type of inputs
React.createElement('h1', { className:'greeting' }, 'Hello World!'});
```

9. Use `Array#map` to create an array of virtual DOM nodes while specifying a unique key for each created virtual DOM node
- All arguments after the first two that are passed to `React.createElement`, including arrays of elements, are used as children for element we are creating.
- In order for React to more easily keep track of each individual element being produced from a mapping function, it wants us to specify a `key` attribute with a unique value for each mapped element. That way if a change occurs to one of the elements, it will be able to update just the one node instead of all mapped nodes.
- This is easy to implement by just adding a `key` to the second argument of `createElement`. If we are dealing with items from a database, we'll often use that item's `id` as the key, since we know it is unique. In this case we are just using the index of the array being created since our elements don't have ids, but ideally we would have something unique to that individual element.
```js
const ProductList = (props) =>
	React.createElement(
		// type
		'ul',
		// properties
		{ className: 'product-list' },
		// children

		props.items.map((item, i) => React.createElement(ProductListItem, { item, key: i }))
	);
```
