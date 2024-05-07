import gsap from "gsap";
import { useCallback, useState } from "react";

const useOpacity = ({ initOpacity }) => {
	const [opacity, setOpacity] = useState(initOpacity);

	const animate = useCallback(({ init = 1, delay = 1, duration = 2, opacityTarget = 0 }) => {
		setOpacity(init);
		const animation = gsap.to(
			{ opacity: init },
			{
				delay,
				duration,
				opacity: opacityTarget,
				ease: "power2.in",
				onUpdate: () => {
					const currentOpacity = animation.targets()[0].opacity;
					setOpacity(currentOpacity);
				},
			}
		);
	}, []);

	return { opacity, animate };
};

export default useOpacity;
