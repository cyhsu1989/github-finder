import React, { Component } from "react";
import PropTypes from "prop-types";

class Search extends Component {
	state = {
		text: ""
	};

	static propTypes = {
		searchUsers: PropTypes.func.isRequired,
		clearUsers: PropTypes.func.isRequired,
		setAlert: PropTypes.func.isRequired,
		showClear: PropTypes.bool.isRequired
	};

	onChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	onSubmit = e => {
		e.preventDefault();
		if (this.state.text === "") {
			this.props.setAlert("Please enter something", "light");
		} else {
			this.props.searchUsers(this.state.text);
		}
	};

	render() {
		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<input
						type="text"
						name="text"
						placeholder="Search Users..."
						value={this.state.text}
						onChange={this.onChange}
					/>
					<button
						type="submit"
						className="btn btn-dark btn-block my-1"
					>
						Search
					</button>
				</form>

				{this.props.showClear && (
					<button
						className="btn btn-light btn-block"
						onClick={this.props.clearUsers}
					>
						Clear
					</button>
				)}
			</div>
		);
	}
}

export default Search;
