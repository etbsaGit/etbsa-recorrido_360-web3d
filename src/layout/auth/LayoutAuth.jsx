import React from "react";
import { Outlet } from "react-router-dom";

export const LayoutAuth = () => {
	return (
		<div>
			<h1>LayoutAuth</h1>
			<Outlet />
		</div>
	);
};
