import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ searchUsers, clearUsers, setAlert, showClear }) => {
	const [text, setText] = useState("");

	const onChange = e => {
		setText(e.target.value);
	};

	const onSubmit = e => {
		e.preventDefault();
		if (text === "") {
			setAlert("Please enter something", "light");
		} else {
			searchUsers(text);
		}
	};

	return (
		<div>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="text"
					placeholder="Search Users..."
					value={text}
					onChange={onChange}
				/>
				<button type="submit" className="btn btn-dark btn-block my-1">
					Search
				</button>
			</form>

			{showClear && (
				<button
					className="btn btn-light btn-block"
					onClick={clearUsers}
				>
					Clear
				</button>
			)}
		</div>
	);
};

Search.propTypes = {
	searchUsers: PropTypes.func.isRequired,
	clearUsers: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired
};

export default Search;
