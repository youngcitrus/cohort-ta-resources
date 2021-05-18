import React from 'react';
import { Route, NavLink } from 'react-router-dom';

import Red from './Red';

const Green = (props) => (
	<div>
		<h2 className='green'>Green</h2>
		<NavLink to={props.match.url}>Green Only</NavLink>
		<NavLink to={`${props.match.url}/red`}>Red</NavLink>
		<Route path={`${props.match.path}/red`} component={Red} />
	</div>
);

export default Green;
