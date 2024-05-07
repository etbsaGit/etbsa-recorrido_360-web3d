import { useEffect, useRef, useState } from "react";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import { Loading } from "../../components";
import Information from "./Information";
import ViewControl from "./ViewControl";
import { App } from "../../3D/App";
import Image360 from "./Image360";

const View = () => {
	const ref = useRef();
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (!ref.current.iscreated) {
			ref.current.iscreated = true;
			const container = ref.current;
			const app = new App(container);
			app.init();
		}

		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		ObserverEmitter.on(EVENTS.initLoading, () => {
			setIsLoading(true);
		});
		ObserverEmitter.on(EVENTS.loadingComplete, () => {
			setIsLoading(false);
		});
	}, []);
	return (
		<div ref={ref} className="grow h-full relative cursor-move ">
			<Image360 />
			<Information />
			<ViewControl />
			<Loading isActive={isLoading} />
		</div>
	);
};

export default View;
