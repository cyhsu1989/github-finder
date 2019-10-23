import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import Search from "./component/user/Search";
import axios from "axios";

class App extends Component {
	state = {
		users: [],
		loading: false
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
				this.setState({ users: res.data.items, loading: false });
			});
	};

	render() {
		const { users, loading } = this.state;
		return (
			<div className="App">
				<Navbar></Navbar>
				<div className="container">
					<Search searchUsers={this.searchUsers}></Search>
					<Users users={users} loading={loading}></Users>
				</div>
			</div>
		);
	}
}

export default App;
