import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import Search from "./component/user/Search";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import User from "./component/user/User";
import axios from "axios";

class App extends Component {
	state = {
		users: [],
		user: {},
		loading: false,
		alert: null
	};

	componentDidMount() {
		this.setState({ loading: true });
		axios
			.get(
				`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				this.setState({ users: res.data, loading: false });
			});
	}

	searchUsers = text => {
		this.setState({ loading: true });
		axios
			.get(
				`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				this.setState({
					users: res.data.items,
					loading: false,
					alert: null
				});
			});
	};

	clearUsers = () => {
		this.setState({
			users: [],
			loading: false
		});
	};

	getUser = username => {
		this.setState({ loading: true });

		axios
			.get(
				`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				this.setState({
					user: res.data,
					loading: false
				});
			});
	};

	setAlert = (msg, type) => {
		this.setState({ alert: { msg, type } });

		setTimeout(() => {
			this.setState({ alert: null });
		}, 3000);
	};

	render() {
		const { users, user, loading, alert } = this.state;
		return (
			<Router>
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
											searchUsers={this.searchUsers}
											clearUsers={this.clearUsers}
											setAlert={this.setAlert}
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
										getUser={this.getUser}
										loading={loading}
									></User>
								)}
							></Route>
						</Switch>
					</div>
				</div>
			</Router>
		);
	}
}

export default App;
