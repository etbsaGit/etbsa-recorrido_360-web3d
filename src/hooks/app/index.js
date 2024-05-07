import { useContext } from "react";
import { AppContext } from "./context";

const useApp = () => {
	const { hasShowGuide, setGuideStatus, isInside, setIsInside, machine } = useContext(AppContext);

	return {
		machine,
		isInside,
		setIsInside,
		hasShowGuide,
		setGuideStatus,
	};
};

export default useApp;
