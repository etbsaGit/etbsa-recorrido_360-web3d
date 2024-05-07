import { apiRickyAndMorty } from "./api";
import { Enpoints } from "./enpoints";

const responseAxios = (status = 0, msg = "", payload = null) => {
	return {
		status,
		msg,
		payload,
	};
};

export const getDataExample = async () => {
	try {
		const { data } = await apiRickyAndMorty.get(Enpoints.example.test);
		return responseAxios(0, "prueba", data);
	} catch (error) {
		console.log("error", error);
		return responseAxios(1);
	}
};
