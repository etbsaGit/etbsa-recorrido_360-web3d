/* eslint-disable react/prop-types */
const Card = ({ id, preview, title, description, selectMachine }) => {
	return (
		<li
			onClick={selectMachine}
			id={id}
			className="w-[108px] min-h-[182px] max-h-[182px] h-full rounded-xl bg-white card-shadow p-1 duration-150 hover:bg-principal active:bg-[#F5D400]"
		>
			<img src={preview} className="object-contain mx-auto h-[100px] rounded-t-lg  mb-2" />
			{/* {preview} */}
			<div>
				<h4 className="text-black monserrat text-xs font-semibold leading-normal">{title}</h4>
				<p className="text-black monserrat text-xs font-light leading-[14px]">{description}</p>
			</div>
		</li>
	);
};

export default Card;
