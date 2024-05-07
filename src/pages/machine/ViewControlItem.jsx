/* eslint-disable react/prop-types */
const ViewControlItem = ({ id, image, selected, select }) => {
	const isSelected = selected ? id == selected : false;

	return (
		<div onClick={() => select(id)} className="p-[0.3px]  w-16 h-16 rounded-full overflow-hidden flex items-center justify-center">
			<img
				src={image}
				className={`miImagen transition-all duration-500  w-16 h-16 cursor-pointer blur-info ${
					isSelected ? "invert bg-[#0A2CFF]" : "hover:bg-[rgba(0,0,0,0.6)]"
				}`}
			/>
		</div>
	);
};

export default ViewControlItem;
