import { useEffect, useState } from "react";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import { images } from "../../assets/images";
import useApp from "../../hooks/app";

const Image360 = () => {
  const { setIsInside, machine } = useApp();
  const { cardTitle } = machine;
  const [indexButton, setIndexButton] = useState(1);

  useEffect(() => {
    ObserverEmitter.on(EVENTS.changeMachine, () => {
      setIndexButton(1);
      setIsInside(false);
    });
  }, [setIsInside]);

  const setStyleButton = (index) => {
    return index === indexButton
      ? " bg-principal text-[#242B30] "
      : "text-white";
  };

  return (
    <div className="w-full z-20 absolute  right-9  text-white top-[31px] ">
      <div className="ml-auto relative flex justify-center  h-12 w-[336px] ">
        <img src={images.rectangle} className="absolute w-[336px] h-16 top-1" />
        <div className="flex items-center  z-[10000] absolute h-14">
          <h2
            className={`monserrat text-center  font-bold text-[#242B30]`}
            style={{
              fontSize:
                cardTitle.length < 16 ? 32 : cardTitle.length < 21 ? 24 : 20,
            }}
          >
            {cardTitle}
          </h2>
        </div>
      </div>
      <div className="flex justify-end ">
        <div
          id="perspectiva"
          className="rounded-[1.3rem] bg-[rgba(0,0,0,0.6)] p-1 transition-all duration-500 	border-principal border-4"
        >
          <button
            onClick={() => {
              setIndexButton(1);
              setIsInside(false);
              ObserverEmitter.emit(EVENTS.changeView, 1);
            }}
            className={`w-64 h-14 rounded-[1.3rem]  text-xl monserrat font-semibold leading-6 transition-all duration-500 ${setStyleButton(
              1
            )}`}
          >
            Exterior
          </button>
          <button
            onClick={() => {
              setIndexButton(2);
              setIsInside(true);
              ObserverEmitter.emit(EVENTS.changeView, 5);
            }}
            className={`w-64 h-14 rounded-[1.3rem]  text-xl monserrat font-semibold leading-6 transition-all duration-500 ${setStyleButton(
              2
            )}`}
          >
            Interior
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image360;
