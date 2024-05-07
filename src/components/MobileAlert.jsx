import { images } from "../assets/images";
import ButtonOption from "./ButtonOption";

const MovileAlert = () => {
	return (
		<div className="w-full h-screen bg-principal relative overflow-hidden">
			<img src={images.capa} alt="decoration" className="absolute top-0 left-0" />
			<div className="w-full pl-[26px] pr-4 absolute bottom-24">
				<p className="text-[#242B30] monserrat text-2xl font-bold leading-normal">¡Oh no!</p>
				<h2 className="text-[#242B30] monserrat text-4xl font-bold leading-10">Esta página no esta disponible para móviles</h2>
				<div className="w-[158px] pt-4">
					<ButtonOption>Volver al Sitio</ButtonOption>
				</div>
			</div>
		</div>
	);
};

export default MovileAlert;
