import React, { useState, useContext } from "react";
import PropTypes from "prop-types";

import GithubContext from "../../context/github/githubContext";

const Search = ({ clearUsers, setAlert, showClear }) => {
	const githubContext = useContext(GithubContext);

	const [text, setText] = useState("");

	const onChange = e => {
		setText(e.target.value);
	};

	const onSubmit = e => {
		e.preventDefault();
		if (text === "") {
			setAlert("Please enter something", "light");
		} else {
			githubContext.searchUsers(text);
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
	clearUsers: PropTypes.func.isRequired,
	setAlert: PropTypes.func.isRequired,
	showClear: PropTypes.bool.isRequired
};

export default Search;
