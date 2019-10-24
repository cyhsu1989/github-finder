import React, { useContext } from "react";

import AlertContext from "../../context/alert/alertContext";

const Alert = () => {
	// 使用 Context
	const alertContext = useContext(AlertContext);
	// 取得最新的狀態
	const { alert } = alertContext;
	return (
		alert && (
			<div className={`alert alert-${alert.type}`}>
				<i className="fas fa-info-circle"></i> {alert.msg}
			</div>
		)
	);
};

export default Alert;
