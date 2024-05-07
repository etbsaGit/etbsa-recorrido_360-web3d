import { useEffect } from "react";

const images = [
	"../src/assets/icons/S140.jpg",
	"../src/assets/icons/Z530M.jpg",
	"../src/assets/icons/3036E.jpg",
	"../src/assets/icons/7230J.jpg",
	"../src/assets/icons/5090EH.jpg",
	"../src/assets/icons/5076EN.jpg",
	"../src/assets/icons/8R_280.jpg",
	"../src/assets/icons/6105J_H.jpg",
	"../src/assets/icons/5415_DT.png",
	"../src/assets/icons/5076E_DT.jpg",
	"../src/assets/icons/6105EH.jpg",
	"../src/assets/icons/6155J_DT.jpg",
	"../src/assets/icons/Agras_T40.png",
	"../src/assets/icons/6120EH_CAB.jpg",
	"../src/assets/icons/6603_DT_CAB.jpg",
	"../src/assets/icons/6403_DT_CAB.jpg",
	"../src/assets/icons/6125E_DT_CAB.png",
	"../src/assets/icons/6105J_DT_CAB.jpg",
	"../src/assets/icons/5090E_DT_CAB.jpg",
	"../src/assets/icons/5082E_DT_CAB.jpg",
	"../src/assets/icons/35G.jpg",
	"../src/assets/icons/620G.jpg",
	"../src/assets/icons/670G.jpg",
	"../src/assets/icons/320P.jpg",
	"../src/assets/icons/644G.jpg",
	"../src/assets/icons/310L.jpg",
	"../src/assets/icons/200G.jpg",
	"../src/assets/icons/318G.jpg",
	"../src/assets/icons/210G_LC.jpg",
];

const ImagePreloader = ({ children }) => {
	useEffect(() => {
		// Precargar imágenes
		images.forEach((image) => {
			const img = new Image();
			console.log(img);
			img.src = image;
		});
	}, []);

	return <>{children}</>;
};

export default ImagePreloader;
