import { icons } from "../../assets/icons";

export const init = {
	hasShowGuide: false,
	isInside: false,
	machine: {
		cardTitle: "5090E TS",
		title: "Tractor",
		model: "5090E TS",
		description: "",
		preview: (new Image().src = icons.farmer_5090E_DT_CAB),
		id: "card-1",
		machine: "5090E",
		info: [
			"Potencia al Motor: 89 HP",
			"Potencia a la Toma de Fuerza: 83.3 HP",
			"Transmisión: 9A/3R Sincronizada. Opcional 12A/12R PowrReverser™",
			"Cantidad de Cilindros: 4",
			"Capacidad Máxima de Levante: 1,972.3 kgf (a las esferas)",
		],
	},
};

export const settingGuideStatus = "settingGuideStatus";
export const setisinside = "setisinside";
export const setmachine = "setmachine";

export const actions = {
	settingGuideStatus: (state, payload) => {
		const { status } = payload;

		return {
			...state,
			hasShowGuide: status,
		};
	},
	setisinside: (state, payload) => {
		const { status } = payload;

		return {
			...state,
			isInside: status,
		};
	},
	setmachine: (state, payload) => {
		return {
			...state,
			machine: {
				...payload,
			},
		};
	},
};

export const reducer = (state, action) => {
	const { type } = action;
	const fn = actions[type];
	if (!fn) return state;
	const newState = fn(state, action.payload);

	return newState;
};
