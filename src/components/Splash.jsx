/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { images } from "../assets/images";
import useOpacity from "../hooks/opacity";

const Splash = () => {
	const [isActive, setIsActive] = useState(true);
	const { opacity, animate } = useOpacity({});

	useState(() => {
		animate({});
	}, [animate]);

	useEffect(() => {
		if (opacity) return;
		setIsActive(false);
	}, [opacity]);

	if (!isActive) return <></>;

	return (
		<div style={{ opacity, zIndex: 1000000 }} className="absolute top-0 z-50 w-full h-screen bg-principal flex justify-center items-center">
			<div className="flex flex-col gap-1 items-center justify-center">
				<img src={images.logoSplash} alt="splash" className="w-[220px] h-[94px]" />
				<p className="text-[#927C00] text-center monserrat text-[32px] font-bold leading-normal">Experiencia 360°</p>
			</div>
		</div>
	);
};

export default Splash;
