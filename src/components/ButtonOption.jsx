/* eslint-disable react/prop-types */
const ButtonOption = ({ children }) => {
	return (
		<button className="w-full h-full py-[6px] px-3 text-center text-white monserrat text-sm font-bold leading-5 bg-secondary rounded-3xl">
			{children}
		</button>
	);
};

export default ButtonOption;
