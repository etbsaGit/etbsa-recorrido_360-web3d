import { useCallback, useEffect, useState } from "react";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import ViewControlItem from "./ViewControlItem";
import { images } from "../../assets/images";
import useApp from "../../hooks/app";

const ViewControl = () => {
	const [selected, setSelected] = useState(1);
	const { isInside } = useApp();

	const select = useCallback((value) => {
		setSelected(value);
		ObserverEmitter.emit(EVENTS.changeView, value);
	}, []);

	useEffect(() => {
		ObserverEmitter.on(EVENTS.changeMachine, () => {
			setSelected(1);
		});
	}, []);
	useEffect(() => {
		if (!isInside) return;
		setSelected(1);
	}, [isInside]);

	if (isInside) return <></>;
	return (
		<div id="vista" className="w-[88px] h-[351px] absolute z-20 bottom-10 right-9  flex flex-col gap-5 items-center ">
			<ViewControlItem id={1} selected={selected} image={images.ViewUp} select={select} />
			<ViewControlItem id={2} selected={selected} image={images.ViewRight} select={select} />
			<ViewControlItem id={3} selected={selected} image={images.ViewDown} select={select} />
			<ViewControlItem id={4} selected={selected} image={images.ViewLeft} select={select} />
		</div>
	);
};

export default ViewControl;
