## React Builds Objectives
1. Understand what front-end builds are and why they're needed.
- Front-end builds take our files and convert them into optimized versions that are compatible with execution in browsers.
- Extended file types like JSX, TypeScript, or Sass, which are not recognizable by browsers, are converted into their standard library formats (JavaScript and CSS in these cases).
- New features of languages can be converted to older syntax to ensure compatibility with browsers that have not been updated to understand the new features of the language.
- Code can be minified, removing unnecessary characters and converting to smaller names which may not be easily readable by humans but are more efficient for the browser to interact with.
- Tree-shaking: removes unnecessary aspects of your code, especially unused modules
- Files can be bundled, combining multiple files into fewer, larger files. This reduces the number of fetches that need to be done for resources.

2. Describe at a high level what happens in a Create React App when you run `npm start`.
- Environment variables are loaded
- The list of browsers to support are checked
- The configured HTTP port is checked to ensure that it's available
- The application compiler is configured and created
- `webpack-dev-server` is started
- `webpack-dev-server` compiles your application
- The `index.html` file is loaded into the browser
- A file watcher is started to watch your files, waiting for changes

3. Prepare to deploy a React application into a production environment.
- Environment variables that may be needed by the application can be added to a `.env` file. These variables have to start with the prefix `REACT_APP_` in order for Create React App to process them. Environment variables are useful for values that will change across environments (maybe you want to indicate in your title that you are in a development build in development, but just have the standard title in production, for example)
- In the `package.json`, you can specify which versions of browsers you would like to make your build for. This will affect how your code is transpiled (using older JavaScript syntax for older browsers, etc.). To make these changes, you can adjust the `browserslist` key to indicate which browser versions are acceptable. In general, the default values are going to suit you just fine, but we can increase compatibility (and possibly sacrifice some performance) by building for older browsers.
- Run the `npm run build` script. This will create your production files in a `build` folder. The bundled files that are generated can then be served in a production environment, such as from an express server.
- It's important to note that all of the bundling, transpiling, etc., that occurs when we create a build is also occurring in development, it is just being kept in memory instead of being written to files.

## React Context Objectives
- The first four objectives have small code snippets that focus on each aspect, but the final objective has a full working example. It may be helpful to reference the full example if greater context is helpful.

1. Use React Context to pass down global information.
- In order to create a context for our application, we can import the `createContext` function from `react` and store a reference to the invoked value. This context can then be used to make Provider and Consumer wrapper components.
- We can provide a default value for the context as an argument to `createContext`. This value will be overwritten if we provide a value in the Provider (see below)
```js
import { createContext } from 'react';

const ThemeContext = createContext();

export default ThemeContext;
```

2. Create a Provider wrapper component to set a default context.
- We can wrap the component that we want to have the top-most access to our context with a Provider component. Any Consumer component that we want to make (gaining access to our context) must be nested under our Provider, so making this at the highest level that we would need access is important.
- In this example, we want our `App` to be able to react to the `color` key of our context, with a further nested `Profile` component changing the context's value. Because of this, we wrap our `App` in a new component that we make, `AppWithContext`, that returns our `Provider` wrapped component.
- The `value` prop that we pass to our `Provider` will be the value of our context. In this example, we assign the value to be the state of this component. This is an easy way for us to make sure we can update the values and rerender our components.
- By making a function `updateContext` that invokes `setState`, then adding a reference to the function to our state, we can make sure that any component that has access to our context can also update it and trigger a rerender of components that rely on its data.
```js
import React from 'react';
import ThemeContext from './ThemeContext';
import Home from './Home';

const App = ({ color }) => (
	<div id='app' style={{ backgroundColor: `${color}` }}>
		<Home />
	</div>
);

class AppWithContext extends React.Component {
	constructor() {
    super();
    // The updateContext key of our state references the function that is going to invoke setState. Whenever this function is invoked, our state is updated and our component rerenders, triggering an update to our value prop to our Provider and ultimately rerendering our nested components that rely on this data.
		this.state = {
			color: 'white',
			updateContext: this.updateContext
		};
	}

	updateContext = (color) => {
		this.setState({ color });
	};

	render() {
		return (
      {/* The value prop is what we are setting as the value of our context. This is what our Consumer components will ultimately have access to. */}
      <ThemeContext.Provider value={this.state}>
        {/* Here we are passing the color prop directly to app to avoid having to make a Consumer component for this top-level component. */}
				<App color={this.state.color} />
			</ThemeContext.Provider>
		);
	}
}

export default AppWithContext;
```

3. Create a Consumer wrapper component to allow child components to subscribe to a global context.
- Similar to our `Provider` component that set up the value of our context, we can create a `Consumer` component that gets a reference to this value and passes it along as props to the wrapped component.
- In our example, our context has a reference to the `updateContext` function that we made in our `Provider` wrapper, which updates the value of our context. We are passing this function along as a prop to `Profile` so that when we submit our form, we can invoke the function, update our context's value and impact any components that relied on it (namely our top-level `App` component that changed the backgroundColor based on this value).
```js
import React from 'react';
import ThemeContext from './ThemeContext';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }

  updateSelection = (e) => {
    this.setState({ color: e.target.value });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.updateContext(this.state.color);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          onChange={this.updateSelection}
          value={this.state.color}
          placeholder="Type a color!"
        />
        <button onClick={this.handleClick}>
          Submit
        </button>
      </form>
    );
  }
}

const ProfileWithContext = () => {
  return (
    <ThemeContext.Consumer>
      {(value) => <Profile updateContext={value.updateContext} />}
    </ThemeContext.Consumer>
  );
};

export default ProfileWithContext;
```

4. Use the `static contextType` property to access the global context.
- Instead of creating a context Consumer wrapper, we can also set the `contextType` property of a component class and gain access to a designated context through `this.context` instead of `this.props`.
- This strategy only works for class components, not functional components, which require us to use the Consumer wrapper and use `this.props`.
- In general, since functional components are generally preferred over class components if possible, we will prefer to make a Consumer wrapper, but it's good to be familiar with this alternative approach.
```js
import React from 'react';

import ThemeContext from './ThemeContext.js';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }

  // The static keyword is defining contextType on the whole class
  // We could have also said Profile.contextType = ThemeContext after our class definition
  static contextType = ThemeContext;

  handleClick = (e) => {
    e.preventDefault();
    // Note our use of this.context instead of this.props
    this.context.updateContext(this.state.color);
  }
// Rest of component class not shown
}

// Instead of using static within the class, we can also assign the property after the class definition
// Profile.contextType = ThemeContext

// Note how we don't use a Consumer wrapper in this implementation, instead exporting the component directly.
export default Profile;
```

5. Update the global context from a nested component.
- Our Provider wrapper component is setting the value of our context to be equal to the component's state. By adding a reference to our updateContext function to this state, we can invoke it anywhere that we have access to context, updating this component's state, which in turn represents a change in the value of our overall context.
- The code block below is a combination of all of the necessary components to make our Pup image update 
```js
import React, { createContext } from "react";

// ThemeContext.js
// All that we need to do is invoke createContext in order to set up a basis for our Provider and Consumer wrappers
const ThemeContext = createContext();

// App.js
// We're applying the color from context that was passed as a prop to us from our Provider as a style for our component's backgroundColor
const App = ({ color }) => (
	<div id='app' style={{ backgroundColor: `${color}` }}>
		<Home />
	</div>
);

// This wrapped Provider component can be in the same file as the App component it is wrapping or in its own file, as long as wherever we are trying to render our app we are using this component that has access to our context.
// The state is being used as the value for our context. Anywhere that we are giving access to our context, we will be referencing the values stored here.
// By storing a reference to a function that updates state within state itself, we are then able to update the context anywhere that we have access to it by invoking this function.
class AppWithContext extends React.Component {
	constructor() {
		super();
		this.state = {
			color: 'white',
			updateContext: this.updateContext
		};
	}

	updateContext = (color) => {
		this.setState({ color });
	};

	render() {
		return (
			<ThemeContext.Provider value={this.state}>
				<App color={this.state.color} />
			</ThemeContext.Provider>
		);
	}
}

// Home.js
// This component has no real functional purpose in this app.
// It was created to show that we can access context at any point in our tree, eliminating the need to thread props down directly from each parent to child in the chain.
const Home = () => (
  <div id="home">
    <Profile />
  </div>
);

// Profile.js
// This component is where the user is interacting in order to change the value of our context.
// By submitting the form, we are invoking the updateContext prop that we received from our Consumer wrapper. This updates the state of our Provider wrapper component, which is where the value of our context is being tracked.
class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
    };
  }

  updateSelection = (e) => {
    this.setState({ color: e.target.value });
  }

  handleClick = (e) => {
    e.preventDefault();
    this.props.updateContext(this.state.color);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          onChange={this.updateSelection}
          value={this.state.color}
          placeholder="Type a color!"
        />
        <button onClick={this.handleClick}>
          Submit
        </button>
      </form>
    );
  }
}

// Like with our Provider wrapper, the Consumer wrapper can either be in the same file as the wrapped component and exported instead of it, or it can be in its own file, as long as wherever we intend to use the wrapped component we are referencing this version with Context.
// The value that we are receiving as an argument is the value of our context (the state of our Provider component in this particular example). Here we are destructuring the updateContext key of that state since that is the only part we need access to in Profile, but we also could have just passed the value directly and destructured in the Profile component.
const ProfileWithContext = () => {
  return (
    <ThemeContext.Consumer>
      {(value) => <Profile updateContext={value.updateContext} />}
    </ThemeContext.Consumer>
  );
};
```