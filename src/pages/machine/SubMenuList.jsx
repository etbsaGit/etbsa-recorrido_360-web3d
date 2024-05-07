import { useRef } from "react";
import { icons } from "../../assets/icons";

/* eslint-disable react/prop-types */
const SubMenuList = ({ children, list }) => {
	const isList = list && list.length > 0;

	return (
		<nav
			className={`ml-[104px] bg-white  overflow-scroll  max-w-[390px]  h-screen  absolute top-0 z-50 rounded-r-[24px]  transition-all duration-[200] ${
				isList ? " w-full" : "w-0"
			}
			`}
		>
			<ul className="w-full  ">{children}</ul>
		</nav>
	);
};

const Item = ({ id, title = "", children, select, selected }) => {
	const beginningList = useRef();
	const isSelected = selected === id;
	return (
		<li
			className={`w-full flex items-center justify-between  cursor-pointer duration-300 transition-all flex-wrap  max-h-[705px] overflow-scroll  `}
		>
			<div
				id={id}
				onClick={() => {
					beginningList.current.scrollIntoView({ behavior: "smooth", block: "start" });
					select(id);
				}}
				className={`h-16 px-[26px] flex items-center justify-between w-full ${isSelected && "card-shadow"} rounded-none`}
			>
				<p className="monserrat text-base font-medium leading-normal">{title}</p>
				<img src={isSelected ? icons.minus : icons.plus} />
			</div>
			<ul
				ref={beginningList}
				className={`w-[374px]  flex-wrap gap-[16px]  justify-start flex mx-auto px-2
				 duration-[450] transition-all ${isSelected ? "h-auto py-4 " : "h-0 overflow-hidden"} scroll-m-0 `}
			>
				{children}
			</ul>
		</li>
	);
};

SubMenuList.Item = Item;

export default SubMenuList;
