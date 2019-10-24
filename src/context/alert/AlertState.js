import React, { useReducer } from "react";
import AlertContext from "./alertContext";
import AlertReducer from "./alertReducer";
import { SET_ALERT, REMOVE_ALERT } from "../../types";

const AlertState = props => {
	const initialState = null;
	// useReducer(處理函式, 初始狀態)，是 useState 的替代方案
	// 會回傳目前的狀態 (state)，以及一個派送函式 (dispatch)
	console.log(useReducer(AlertReducer, initialState));
	const [state, dispatch] = useReducer(AlertReducer, initialState);

	const setAlert = (msg, type) => {
		// 派送改變狀態的一個「行動物件」
		dispatch({
			type: SET_ALERT,
			payload: { msg, type }
		});

		setTimeout(() => {
			dispatch({ type: REMOVE_ALERT });
		}, 3000);
	};

	return (
		// 將資料儲存進 Context 空間
		<AlertContext.Provider
			value={{
				alert: state,
				setAlert
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
