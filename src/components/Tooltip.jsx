/* eslint-disable react/prop-types */

const Tooltip = ({
  title,
  body,
  changeInfo,
  isRight,
  isBottom,
  isSelector,
}) => {
  const dialogBoxClass = isRight ? "dialog-box" : "dialog-box-left";
  const topValue = `${isBottom && "dialog-top"}`;
  const selectorStyles = isSelector ? "dialog-selector" : "";
  console.log("oyeeeee");
  console.log(selectorStyles);
  return (
    <div
      id="tooltip"
      className={`${dialogBoxClass} ${topValue} ${selectorStyles} w-[276px]  pb-2 h-fit`}
    >
      <div>
        <h2 className="text-black monserrat font-bold text-sm">{title}</h2>
        <p className="text-black monserrat text-sm font-normal leading-normal  mb-1">
          {body}
        </p>
        <button
          onClick={changeInfo}
          className="bg-principal float-right py-[6px] px-3 monserrat text-sm font-bold leading-5 rounded-3xl"
        >
          Entendido
        </button>
      </div>
    </div>
  );
};

export default Tooltip;
