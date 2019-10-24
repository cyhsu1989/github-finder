import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./component/layout/Navbar";
import User from "./component/user/User";
import Alert from "./component/layout/Alert";
import About from "./component/pages/About";
import Home from "./component/pages/Home";
import NotFound from "./component/pages/NotFound";
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
								<Route exact path="/" component={Home}></Route>
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
								<Route component={NotFound}></Route>
							</Switch>
						</div>
					</div>
				</Router>
			</AlertState>
		</GithubState>
	);
};

export default App;
