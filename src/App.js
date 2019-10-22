import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import axios from "axios";

class App extends Component {
	state = {
		users: [],
		loading: false
	};

	componentDidMount() {
		this.setState({ loading: true });
		axios.get("https://api.github.com/users").then(res => {
			this.setState({ users: res.data, loading: false });
		});
	}

	render() {
		const { users, loading } = this.state;
		return (
			<div className="App">
				<Navbar></Navbar>
				<div className="container">
					<Users users={users} loading={loading}></Users>
				</div>
			</div>
		);
	}
}

export default App;
