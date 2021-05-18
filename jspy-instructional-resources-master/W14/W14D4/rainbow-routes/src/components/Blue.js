import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Indigo from './Indigo';

class Blue extends React.Component {
	render() {
		return (
			<div>
				<h2 className='blue'>Blue</h2>
				<NavLink exact to='/blue'>
					Blue only
				</NavLink>
				<NavLink to='/blue/indigo'>Add indigo</NavLink>

				<Route path='/blue/:subColor' component={Indigo} />
			</div>
		);
	}
}

export default Blue;
