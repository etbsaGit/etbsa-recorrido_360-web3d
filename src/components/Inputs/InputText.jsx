import React from "react";

export const InputText = ({ name = "", type = "text", placeholder = "" }) => {
	return (
		<div>
			<label htmlFor={name}></label>
			<input id={name} type={type} placeholder={placeholder} />
		</div>
	);
};
