import { useCallback, useState } from "react";
import { buildingId, buildingList, farmingId, farmingList } from "../hooks/menu/constants";
import { SubMenu } from "../pages/machine";
import { images } from "../assets/images";
import MenuList from "./MenuList";

const Menu = () => {
	const [selected, setSelected] = useState();

	const selectMenu = useCallback((value) => {
		setSelected((selected) => {
			if (selected === value) return null;
			return value;
		});
	}, []);

	return (
		<div>
			<div className="w-[104px] h-full bg-principal relative overflow-hidden">
				<MenuList>
					<div className={` ${!selected ? "bg-principal" : "bg-white"}`}>
						<MenuList.Item
							id={"menulogo"}
							image={images.logo}
							selected={selected}
							index={0}
							list={{ index: 0, id: -1 }}
							select={() => setSelected(null)}
						/>
					</div>
					<div id={farmingId} className={` ${!selected ? "bg-principal rounded-3xl" : "bg-white"}`}>
						<MenuList.Item
							image={images.agrigultura}
							name={"Agricultura"}
							selected={selected}
							select={selectMenu}
							list={farmingList}
							index={1}
						/>
						<MenuList.Item
							id={buildingId}
							image={images.construccion}
							name={"Construcción"}
							selected={selected}
							select={selectMenu}
							list={buildingList}
							index={2}
						/>
					</div>
					<div id={farmingId} className={`${!selected ? "bg-principal" : "bg-white"}`}>
						<MenuList.Item id={"blank"} list={{ id: -2 }} selected={selected} index={3} />
					</div>
				</MenuList>
			</div>
			<SubMenu selectMachine={() => setSelected(null)} list={selected ? selected.subMenus : []} />
		</div>
	);
};

export default Menu;
