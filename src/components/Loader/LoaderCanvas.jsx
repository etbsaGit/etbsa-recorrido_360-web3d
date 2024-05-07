import React, { useState } from "react";
import ObserverEmitter, { EVENTS } from "../../emitter/Observer";

export const LoaderCanvas = () => {
	const [loading, setLoading] = useState(true);
	ObserverEmitter.on(EVENTS.initLoading, (value) => {
		setLoading(true);
	});

	ObserverEmitter.on(EVENTS.loadingComplete, (value) => {
		setLoading(false);
	});

	if (loading) {
		return (
			<div className="fixed z-50 w-full h-full flex justify-center items-center bg-black bg-opacity-90" style={{ backdropFilter: `blur(8px)` }}>
				<img className="w-10 h-10" src="https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif" alt="" />
			</div>
		);
	}
	return <></>;
};
