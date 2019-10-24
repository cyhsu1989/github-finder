import React, { Fragment } from "react";
import Search from "../../component/user/Search";
import Users from "../../component/user/Users";

const Home = () => {
	return (
		<Fragment>
			<Search></Search>
			<Users></Users>
		</Fragment>
	);
};

export default Home;
