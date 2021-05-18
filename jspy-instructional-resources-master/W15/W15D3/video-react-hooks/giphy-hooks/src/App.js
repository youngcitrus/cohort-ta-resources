import React, { useState } from 'react';
import { GifContext } from './GifContext';
import Gif from './Gif';
import SearchBar from './SearchBar';
import { Route, NavLink } from 'react-router-dom';

const App = () => {
	const [ searchQuery, setSearchQuery ] = useState('hello');

	return (
		<main>
			<nav>
				<NavLink exact to='/'>
					Home
				</NavLink>
				<NavLink to='/gif'>Gifs!</NavLink>
			</nav>
			<GifContext.Provider value={{ searchQuery, setSearchQuery }}>
				<Route path='/gif' component={Gif} />
				<Route path='/gif' component={SearchBar} />
			</GifContext.Provider>
		</main>
	);
};

export default App;
