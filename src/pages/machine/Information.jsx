import { useEffect, useState } from "react";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import { images } from "../../assets/images";
import useOpacity from "../../hooks/opacity";
import { icons } from "../../assets/icons";
import useApp from "../../hooks/app";

const Information = () => {
	const { machine } = useApp();
	const { info = [], title, model } = machine;
	const { opacity, animate } = useOpacity({ initOpacity: 0 });
	const [showInformation, setShowInformation] = useState(true);

	useEffect(() => {
		const [init, target] = showInformation ? [0, 1] : [1, 0];
		animate({ init, opacityTarget: target, delay: 0, duration: 0.25 });
	}, [showInformation, animate]);

	useEffect(() => {
		ObserverEmitter.on(EVENTS.changeMachine, () => {
			setShowInformation(true);
		});
	}, []);

	return (
		<div className="absolute z-20 bottom-10 left-9 ">
			<img
				id="ficha"
				onClick={() => setShowInformation((value) => !value)}
				src={images.info}
				alt="Info of the machine"
				className=" w-16 h-16  hover:cursor-pointer transition-opacity hover:opacity-50"
			/>

			<div
				style={{ display: showInformation ? "block" : "none", opacity }}
				className={`py-8 px-[10px] bg-[rgba(0,0,0,.6)] rounded-2xl  bottom-[77px] transition-all duration-500 w-[384px] min-h-[331px]  blur-info absolute`}
			>
				<img src={images.johnIcon} alt="john icon" className="mx-auto w-[154px] mb-2" />
				<h3 className="text-center text-white monserrat text-2xl leading-normal font-bold h-[29px]">{model}</h3>
				<p className="text-center text-white monserrat text-base leading-normal font-semibold mb-0 h-[20px]">{title}</p>
				<ul className=" w-full h-min-[165px] pl-4 h py-10  ">
					{info.map((caracteristic) => {
						return (
							<li key={caracteristic} className="text-white monserrat text-sm font-normal leading-normal list-disc">
								{caracteristic}
							</li>
						);
					})}
				</ul>
				<div className=" flex justify-center  gap-2 ">
					<button className="bg-principal hover:bg-[#F5D400] active:bg-[#E4B229] w-[162px] py-[6px]  text-center rounded-3xl  monserrat text-sm font-bold flex items-center gap-2 justify-center leading-5">
						<img src={icons.document} />
						<span>Ficha técnica</span>
					</button>
					<button className="bg-[#25D366] hover:bg-[#2ADE6D] active:bg-[#1DAA52] w-[162px] py-[6px] text-center rounded-3xl  monserrat text-sm font-bold flex items-center gap-1 justify-center leading-5 text-white">
						<img src={icons.whatsapp} />

						<span>Cotizar ahora</span>
					</button>
				</div>
				<img
					onClick={() => setShowInformation((value) => !value)}
					src={icons.xMark}
					alt="x mark"
					className="absolute top-3 right-3 cursor-pointer"
				/>
			</div>
		</div>
	);
};

export default Information;
