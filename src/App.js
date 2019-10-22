import React, { Component } from "react";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import axios from "axios";

class App extends Component {
	state = {
		users: []
	};

	componentDidMount() {
		axios.get("https://api.github.com/users").then(res => {
			this.setState({ users: res.data });
		});
	}

	render() {
		return (
			<div className="App">
				<Navbar></Navbar>
				<div className="container">
					<Users users={this.state.users}></Users>
				</div>
			</div>
		);
	}
}

export default App;
