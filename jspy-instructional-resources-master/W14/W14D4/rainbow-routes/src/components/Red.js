import React from 'react';
import { Route, NavLink } from 'react-router-dom';
import Orange from './Orange';
import Yellow from './Yellow';

class Red extends React.Component {
	render() {
		const { path, url } = this.props.match;
		return (
			<div>
				<h2 className='red'>Red</h2>
				<NavLink exact to={url}>
					Red only
				</NavLink>
				<NavLink to={`${url}/orange`}>Add orange</NavLink>
				{/* <NavLink to={`/red/orange`}>Add orange</NavLink> */}
				<NavLink to={`${url}/yellow`}>Add yellow</NavLink>

				<Route path={`${path}/orange`} component={Orange} />
				<Route path={`${path}/yellow`} component={Yellow} />
			</div>
		);
	}
}

export default Red;
