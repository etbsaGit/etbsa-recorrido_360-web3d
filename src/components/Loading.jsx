/* eslint-disable react/prop-types */
import { createPortal } from "react-dom";
import { images } from "../assets/images";

const Loading = ({ isActive = false }) => {
	if (!isActive) return <></>;

	return (
		<>
			{createPortal(
				<div style={{ zIndex: 100000 }} className="absolute top-0 w-screen h-screen bg-principal flex justify-center items-center ">
					<div className=" overflow-hidden relative">
						<img src={images.loading} alt="loading section" className="w-[296px] " />
						<p
							id="loading-text"
							className="absolute top-[60%] w-full text-center text-[#927C00] monserrat text-[32px] font-bold leading-normal fadeinout"
						>
							Cargando...
						</p>
					</div>
				</div>,
				document.body
			)}
		</>
	);
};

export default Loading;
