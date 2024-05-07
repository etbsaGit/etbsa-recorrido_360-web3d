import React, { useEffect, useRef } from "react";
import { App } from "../3D/app";
import { LoaderCanvas } from "../components/Loader/LoaderCanvas";
import { Outlet } from "react-router-dom";

function Container3D() {
	const containerRef = useRef(null);

	useEffect(() => {
		if (!containerRef.current.iscreated) {
			containerRef.current.iscreated = true;
			const container = containerRef.current;
			const app = new App(container);
			app.onResized();
		}

		// eslint-disable-next-line
	}, []);

	return (
		<>
			<Outlet />
			<LoaderCanvas />
			<div ref={containerRef} id="container" className="fixed w-full h-full bg-white"></div>
		</>
	);
}

export default Container3D;
