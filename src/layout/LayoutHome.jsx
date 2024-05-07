import { useCallback, useState } from "react";
import { isMobile as mobile } from "react-device-detect";
import { Menu, MobileAlert, Splash } from "../components";
import { Guide, View } from "../pages/machine";
import useApp from "../hooks/app";

export const LayoutHome = () => {
	const [isMobile, setIsMobile] = useState();
	const { hasShowGuide } = useApp();

	const updateDevice = useCallback(() => {
		const userAgent = navigator.userAgent;

		const validation =
			/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile/i.test(userAgent) &&
			/Mobi/i.test(userAgent) &&
			/Windows NT|Macintosh|Mac OS X|Intel Mac OS X|CPU iPhone/i.test(userAgent) === false;
		if (validation) {
			return setIsMobile(true);
		} else {
			return setIsMobile(mobile);
		}
	}, []);

	useState(() => {
		window.addEventListener("resize", updateDevice);

		return () => {
			window.removeEventListener("resize", updateDevice);
		};
	}, []);

	if (isMobile) return <MobileAlert />;

	return (
		<main className="w-full h-screen flex ">
			<Splash />
			<Menu />
			<View />
			{!hasShowGuide && <Guide />}
		</main>
	);
};
