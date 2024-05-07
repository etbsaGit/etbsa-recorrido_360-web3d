/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { createContext, useCallback, useEffect, useReducer } from "react";
import { init, reducer, setisinside, setmachine, settingGuideStatus } from "./reducer";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";

export const AppContext = createContext({
	hasShowGuide: init.hasShowGuide,
	isInside: init.isInside,
	machine: init.machine,
	setIsInside: (value) => {},
	setGuideStatus: (value = false) => {},
});

const ContextProvider = ({ children }) => {
	const [status, dispatch] = useReducer(reducer, { hasShowGuide: init.hasShowGuide, isInside: init.isInside, machine: init.machine });
	const { hasShowGuide, isInside, machine } = status;

	useEffect(() => {
		ObserverEmitter.on(EVENTS.onChangeMachineInfo, (infoMachine) => {
			dispatch({ type: setmachine, payload: { ...infoMachine } });
		});
	}, []);

	const setGuideStatus = useCallback((status = false) => {
		dispatch({ type: settingGuideStatus, payload: { status } });
	}, []);

	const setIsInside = useCallback((status = false) => {
		dispatch({ type: setisinside, payload: { status } });
	}, []);

	return <AppContext.Provider value={{ hasShowGuide, setGuideStatus, machine, isInside, setIsInside }}>{children}</AppContext.Provider>;
};

export default ContextProvider;
