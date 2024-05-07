/* eslint-disable react/prop-types */
import { memo, useEffect, useState } from "react";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import SubMenuList from "./SubMenuList";
import Card from "./Card";

const Element = ({ list = [], selectMachine }) => {
	const [selected, setSelected] = useState(null);

	useEffect(() => {
		setSelected(null);
	}, [list]);

	useEffect(() => {}, [selected]);

	const selectItem = (value) => {
		setSelected((selected) => {
			if (selected === value) return null;
			return value;
		});
	};
	const SubMenuElements = list.map((current) => {
		const { id, title, cards = [] } = current;
		const cardElements = cards.map((card) => {
			const { id, preview, cardTitle, description, machine, info } = card;
			return (
				<Card
					id={id}
					key={id}
					preview={preview}
					title={`${title} ${cardTitle}`}
					description={description}
					selectMachine={() => {
						ObserverEmitter.emit(EVENTS.changeMachine, machine);
						ObserverEmitter.emit(EVENTS.onChangeMachineInfo, {
							id,
							info,
							title,
							machine,
							preview,
							description,
							model: cardTitle,
							cardTitle: `${title} ${cardTitle}`,
						});
						selectMachine(null);
					}}
				/>
			);
		});
		return (
			<SubMenuList.Item id={id} key={id} title={title} select={selectItem} selected={selected}>
				{cardElements}
			</SubMenuList.Item>
		);
	});

	return <SubMenuList list={list}>{SubMenuElements}</SubMenuList>;
};

const SubMenu = memo(Element);
export default SubMenu;
