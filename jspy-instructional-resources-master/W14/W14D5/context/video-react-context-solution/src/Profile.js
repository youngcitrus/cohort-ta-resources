import React from 'react';
import ThemeContext from './ThemeContext';

class Profile extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			color: ''
		};
	}

	// static contextType = ThemeContext;

	updateSelection = (e) => {
		this.setState({ color: e.target.value });
	};

	handleClick = (e) => {
		e.preventDefault();
		this.props.updateContext(this.state.color);
		// this.context.updateContext(this.state.color);
	};

	render() {
		return (
			<form>
				<input type='text' onChange={this.updateSelection} value={this.state.color} placeholder='Type a color!' />
				<button onClick={this.handleClick}>Submit</button>
			</form>
		);
	}
}

Profile.contextType = ThemeContext;

const ProfileWithContext = () => {
	return (
		<ThemeContext.Consumer>
			{(value) => <h1>{value.color}</h1>}
			{/* {(value) => <Profile updateContext={value.updateContext} />} */}
			{/* {(value) => <Profile {...value} />}
      {(value) => <Profile color={value.color} updateContext={value.updateContext} />} */}
		</ThemeContext.Consumer>
	);
};

export default ProfileWithContext;
