import React, { Fragment, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import User from "./component/user/User";
import Search from "./component/user/Search";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";

import GithubState from "./context/github/GithubState";

const App = () => {
	const [alert, setAlert] = useState(null);

	// TODO: 初始化時，就先 search users

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
										<Search setAlert={showAlert}></Search>
										<Users></Users>
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
								component={User}
							></Route>
						</Switch>
					</div>
				</div>
			</Router>
		</GithubState>
	);
};

export default App;
