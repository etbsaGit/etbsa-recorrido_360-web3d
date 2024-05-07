import axios from "axios";

//* Cambiar el nombre de la api
const apiRickyAndMorty = axios.create({
	// baseURL: process.env.REACT_APP_BACK,
	baseURL: "https://rickandmortyapi.com/api/",
});

apiRickyAndMorty.interceptors.request.use((config) => {
	config.headers = {
		"x-token": localStorage.getItem("token"),
	};
	return config;
});

export { apiRickyAndMorty };
