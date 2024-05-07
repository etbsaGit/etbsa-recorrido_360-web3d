/* eslint-disable react/prop-types */
import useApp from "../hooks/app";

const MenuList = ({ children }) => {
	return <ul className="w-full h-full  pt-4 flex flex-col items-center bg-principal ">{children}</ul>;
};

const Item = ({ id, image, name, selected, select, list, index }) => {
	const { hasShowGuide } = useApp();

	const isSelected = selected ? selected.id === list.id : false;
	const selectedIsDown = selected ? (isSelected ? false : selected.index + 1 === index) : false;
	const selectedIsUp = selected ? (isSelected ? false : selected.index - 1 === index) : false;
	const noStyle = !["menulogo", "blank"].includes(id) && " duration-[150] transition-transform hover:scale-105";
	const sizeImage = index === 0 ? "80px" : "52px";
	return (
		<li
			onClick={() => select(list)}
			className={`z-50 list-none destacar  w-[104px]   flex justify-center 
			${selectedIsUp && "  bg-principal rounded-br-3xl "}
			${selectedIsDown && " bg-principal rounded-tr-3xl "}
			${isSelected && "bg-principal "}
			${(selectedIsUp || selectedIsDown) && "bg-principal"}
			${["menulogo", "blank"].includes(id) && "bg-principal"}
		`}
		>
			<div
				className={`w-full  
				
			 ${!hasShowGuide && selectedIsUp && " "}
			 ${!hasShowGuide && selectedIsDown && " "}
			${isSelected ? "ml-2 rounded-l-3xl bg-white" : ""} 
			${list && "cursor-pointer "} py-[9px]
			`}
			>
				<div
					id={id}
					className={`w-[82px] mx-auto flex flex-col justify-center items-center h-[70px] rounded-3xl py-10 
					${noStyle}
					`}
				>
					{image && <img src={image} className={`w-[${sizeImage}] h-[${sizeImage}]`} />}
					<p className="text-center text-xs monserrat leading-normal font-semibold text-secondary select-none	">{name}</p>
				</div>
			</div>
		</li>
	);
};

MenuList.Item = Item;

export default MenuList;
