import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import Search from "./component/user/Search";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import User from "./component/user/User";
import axios from "axios";

import GithubState from "./context/github/GithubState";

const App = () => {
	const [users, setUsers] = useState([]);
	const [user, setUser] = useState({});
	const [repos, setRepos] = useState([]);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	useEffect(() => {
		setLoading(true);
		axios
			.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				setUsers(res.data);
				setLoading(false);
			});
	}, []);

	const clearUsers = () => {
		setUsers([]);
		setLoading(false);
	};

	const getUser = username => {
		setLoading(true);
		axios
			.get(
				`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				setUser(res.data);
				setLoading(false);
			});
	};

	const getRepos = username => {
		setLoading(true);
		axios
			.get(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created&direction=desc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				setRepos(res.data);
				setLoading(false);
			});
	};

	const showAlert = (msg, type) => {
		setAlert({ msg, type });

		setTimeout(() => {
			setAlert(null);
		}, 3000);
	};

	return (
		<GithubState>
			<Router basename={process.env.PUBLIC_URL}>
				<div className="App">
					<Navbar></Navbar>
					<div className="container">
						<Alert alert={alert}></Alert>
						<Switch>
							<Route
								exact
								path="/"
								render={props => (
									<Fragment>
										<Search
											clearUsers={clearUsers}
											setAlert={showAlert}
											showClear={
												users.length > 0 ? true : false
											}
										></Search>
										<Users
											users={users}
											loading={loading}
										></Users>
									</Fragment>
								)}
							></Route>
							<Route
								exact
								path="/about"
								component={About}
							></Route>
							<Route
								exact
								path="/user/:login"
								render={props => (
									<User
										{...props}
										user={user}
										repos={repos}
										getRepos={getRepos}
										getUser={getUser}
										loading={loading}
									></User>
								)}
							></Route>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
