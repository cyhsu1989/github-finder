import React, { Fragment, useContext, useEffect } from "react";
import Search from "../../component/user/Search";
import Users from "../../component/user/Users";

import GithubContext from "../../context/github/githubContext";

const Home = () => {
	const githubContext = useContext(GithubContext);
	useEffect(() => {
		githubContext.searchUsers();
		// eslint-disable-next-line
	}, []);
	return (
		<Fragment>
			<Search></Search>
			<Users></Users>
		</Fragment>
	);
};

export default Home;
