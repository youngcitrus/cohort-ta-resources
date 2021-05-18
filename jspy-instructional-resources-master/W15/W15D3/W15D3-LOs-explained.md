## React Hooks Learning Objectives

1. Create function components that use state and other React features.
- We can replace the aspects that required us to previously use class components (the use of state and lifecycle methods) with functions imported from the `react` library. This allows us to now use function-based components in every scenario.
- We can replace state by using the `useState` hook. The return value is an array with the a reference to the value being stored as the first element and the function to update the value as the second element.
  - We can also specify an initial value by passing in an argument to `useState`.
```js
// SearchBar.js
const [inputValue, setInputValue] = useState('');
```
  - Wherever we want to reference this value in our component we can use the name we gave to it as the first element.
  - Whenever we want to update the value we can invoke the function we captured as the second element, passing in the new value.
- We can replace lifecycle methods with the `useEffect` hook. `useEffect` takes in a callback function that will be invoked in response to specific events, and an optional array of dependencies as a second argument to define those events:
  - Without specifying a second argument, the function will be invoked after every render.
  - Specifying an array as the second argument will only invoke the function on first mounting and when one of the dependencies listed in the array changes. This means that we can also supply an empty array to ensure the function is only invoked one time, on component mounting.
  - The following effect will be invoked on mount as well as whenever our `context.searchquery` changes.
```js
useEffect(() => {
  const fetchGif = async () => {
    try {
      const res = await fetch(`${apiBaseUrl}&q=${context.searchQuery}`);
      
      if (!res.ok) throw (res);
      const giphyRes = await res.json();
      const gifUrl = giphyRes.data[0].images.fixed_width.url;
      
      setImgUrl(gifUrl);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  fetchGif();
}, [context.searchQuery]);
```
  - Having the callback function return another function will result in the returned function being run as cleanup when the component unmounts. In this way we can replace our use of the `componentWillUnmount` lifecycle method.

2. Use the `useState` hook to manage a component's state.
- See explanation/code of `useState` below
3. Use the `useState` hook to set a default state, instead of setting the default state in a `constructor()` method.
- See explanation/code of `useState` below
4. Use the `useState` hook to update state, instead of the `setState()` method.
- See explanation/code of `useState` below
```js
import React, { useState, useContext } from 'react';
import { GifContext } from './GifContext';

const SearchBar = () => {
  const context = useContext(GifContext);
  // We are tracking an inputValue with our useState hook.
  // To update this value we can invoke setInputValue with a new value.
  // We are providing a default value of an empty string ''
  const [inputValue, setInputValue] = useState('');

  // We are creating a function to be used as an event handler.
  // When a user types in the input box (onChange event), we invoke this function, capturing the current value of the input field and setting it as the new value of inputValue in our state.
  // We were able to update this value in state using setInputValue because that is what we named the second element in the array returned by useState.
  // This would have previously been implemented with this.setState({ inputValue: e.target.value })
  const updateInputVal = e => {
    setInputValue(e.target.value);
  };

  const searchForGif = e => {
    e.preventDefault();
    context.setSearchQuery(inputValue);
  };

  // Just like how we were setting the value of our inputs to the associated key in state, we are controlling the input here by assing it to our state's value.
  // Instead of this.state.inputValue we are simply referring to the inputValue that we destructured from useState.
  return (
    <form onSubmit={searchForGif}>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Search for a GIF!"
      />
    </form>
  );
}

export default SearchBar;
```

5. Use the `useEffect` hook to manage side effect operations (i.e. data fetching).
- Repeated below is the code for a component that performs a fetch for data, in this case a gif url based on a search query.
- The function that we pass in directly to `useEffect` cannot be an `async` function, so we create our async function inside of the callback and immediately invoke it (this could be rewritten as an IIFE)
```js
import React, { useState, useEffect, useContext } from 'react';
import { apiBaseUrl } from './config';
import { GifContext } from './GifContext';

const Gif = () => {
	const context = useContext(GifContext);
	const [ imgUrl, setImgUrl ] = useState();
	const [ isLoading, setIsLoading ] = useState(true);

  useEffect(() => {
    const fetchGif = async () => {
      try {
        const res = await fetch(`${apiBaseUrl}&q=${context.searchQuery}`);
        
        if (!res.ok) throw (res);
        const giphyRes = await res.json();
        const gifUrl = giphyRes.data[0].images.fixed_width.url;
        
        setImgUrl(gifUrl);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
      }
    };

    fetchGif();
  }, [context.searchQuery]);

  if (isLoading) {
		return <h1>Searching for gif...</h1>;
	}

	return (
		<div>
			<img src={`${imgUrl}`} alt='gif' />
			<p>{`It's been ${minutes} "minute${minutes === 1 ? '' : 's'}" since this component mounted.`}</p>
		</div>
	);
};

export default Gif;
```

6. Use the `useEffect` hook in replacement of commonly used component lifecycle methods (`componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`).
- `useEffect` is run when the component is first mounted, replacing `componentDidMount`.
- By specifying what changes we want to respond to in our dependencies array, we can replace our `componentDidUpdate`.
- Returning a function from `useEffect` will invoke the function upon unmounting, replacing our need for `componentWillUnmount`. 

7. Understand how to optimize your application's performance by skipping `useEffect` calls.
- The second argument to `useEffect` is the dependencies array.
- Similar to how we checked to see if certain props or state changed inside of our `componentDidUpdate` method before we invoked any sort of action, the dependencies array checks to see if any of the dependency values have changed and only invokes our `useEffect` hook if a change is detected.
- See previous `useEffect` code blocks for examples.

8. Use the `useContext` hook to access a context object, instead of a `Context.Consumer` or the static `contextType` property.
- `useContext` provides a similar functionality to setting a class component's `contextType`.
- We pass in a reference to the context as an argument to `useContext` and the return value is the object that we can key into for the associated context's value.
- Looking back at the SearchBar component, we use the GifContext's `setSearchQuery` function in order to change the value of the `searchQuery` that context is tracking. This value is ultimately used by our Gif component to search for a matching gif url and display the result in the component.
```js
import React, { useState, useContext } from 'react';
import { GifContext } from './GifContext';

const SearchBar = () => {
  // We pass in a reference to the context that we created and store the return value in a variable
  const context = useContext(GifContext);
  const [inputValue, setInputValue] = useState('');

  const updateInputVal = e => {
    setInputValue(e.target.value);
  };

  const searchForGif = e => {
    e.preventDefault();
    // We are able to access any values that we have on the context within the component.
    // In this case, we are utilizing the setSearchQuery to update the value of searchQuery that context is tracking.
    context.setSearchQuery(inputValue);
  };

  return (
    <form onSubmit={searchForGif}>
      <input
        type="text"
        value={inputValue}
        onChange={updateInputVal}
        placeholder="Search for a GIF!"
      />
    </form>
  );
}

export default SearchBar;
```
