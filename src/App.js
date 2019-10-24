import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import Users from "./component/user/Users";
import User from "./component/user/User";
import Search from "./component/user/Search";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";

import GithubState from "./context/github/GithubState";
import AlertState from "./context/alert/AlertState";

const App = () => {
	// TODO: 初始化時，就先 search users

	return (
		<GithubState>
			<AlertState>
				<Router basename={process.env.PUBLIC_URL}>
					<div className="App">
						<Navbar></Navbar>
						<div className="container">
							<Alert></Alert>
							<Switch>
								<Route
									exact
									path="/"
									render={props => (
										<Fragment>
											<Search></Search>
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
			</AlertState>
		</GithubState>
	);
};

export default App;
