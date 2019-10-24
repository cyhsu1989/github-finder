import {
	SEARCH_USERS,
	GET_USER,
	CLEAR_USERS,
	GET_REPOS,
	SET_LOADING,
	SET_ALERT,
	REMOVE_ALERT
} from "../../types";

export default (state, action) => {
	switch (action.type) {
		case SEARCH_USERS:
			return {
				...state,
				users: action.payload, // 更新 users 資料
				loading: false // 更新 loading 狀態
			};
		case GET_USER:
			return {
				...state,
				user: action.payload,
				loading: false
			};
		case CLEAR_USERS:
			return {
				...state,
				users: [],
				loading: false
			};
		case SET_LOADING:
			return {
				...state, // 複製目前 state 的物件屬性
				loading: true // 更新 loading 狀態
			};

		default:
			return state;
	}
};
