import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./githubContext";
import GithubReducer from "./githubReducer";
import {
	SEARCH_USERS,
	GET_USER,
	CLEAR_USERS,
	GET_REPOS,
	SET_LOADING,
	SET_ALERT,
	REMOVE_ALERT
} from "../../types";

const GithubState = props => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(GithubReducer, initialState);

	// Search Users
	const searchUsers = text => {
		setLoading();
		axios
			.get(
				`https://api.github.com/search/users?${
					text ? `q=${encodeURIComponent(text)}` : ""
				}&client_id=${
					process.env.REACT_APP_GITHUB_CLIENT_ID
				}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				// 派送任務到 Reducer，任務是：SEARCH_USERS，並帶上從 API 取得的資料：payload
				dispatch({
					type: SEARCH_USERS,
					payload: res.data.items
				});
			});
	};

	// Get User
	const getUser = username => {
		setLoading();
		axios
			.get(
				`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				dispatch({
					type: GET_USER,
					payload: res.data
				});
			});
	};

	// Get Repos
	const getRepos = username => {
		setLoading();
		axios
			.get(
				`https://api.github.com/users/${username}/repos?per_page=5&sort=created&direction=desc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secrect=${process.env.REACT_APP_GITHUB_CLIENT_SECRECT}`
			)
			.then(res => {
				dispatch({
					type: GET_REPOS,
					payload: res.data
				});
			});
	};

	// Clear Users
	const clearUsers = () => dispatch({ type: CLEAR_USERS });

	// Set Loading
	// 派送任務到 Reducer，任務是：SET_LOADING
	const setLoading = () => dispatch({ type: SET_LOADING });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				user: state.user,
				repos: state.repos,
				loading: state.loading,
				searchUsers,
				clearUsers,
				getUser,
				getRepos
			}}
		>
			{props.children}
		</GithubContext.Provider>
	);
};

export default GithubState;
