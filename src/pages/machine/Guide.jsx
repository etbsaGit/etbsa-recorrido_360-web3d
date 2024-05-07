import { useEffect, useRef, useState } from "react";
import { farmingId } from "../../hooks/menu/constants";
import useTooltips from "../../hooks/Tooltips";
import { Tooltip } from "../../components";
import useApp from "../../hooks/app";
import { icons } from "../../assets/icons";

const guideElements = [
  {
    id: farmingId,
    isRight: true,
    title: "Catálogo",
    isSelector: false,
    body: "Explora cada uno de los 30 equipos de construcción que ofrecemos.",
  },
  {
    id: "perspectiva",
    isRight: false,
    isSelector: true,
    title: "Perspectiva",
    body: "Presiona y conoce la vista interior y exterior de las máquinas.",
  },
  {
    id: "vista",
    isRight: false,
    isBottom: true,
    isSelector: false,
    title: "Vista 360º",
    body: "Observa las máquinas desde distintos ángulos dando click en cada uno de los módulos.",
  },
  {
    id: "ficha",
    isRight: true,
    isBottom: true,
    isSelector: false,
    title: "Ficha técnica",
    body: "Conoce más acerca de cada uno de los equipos que se presentan en pantalla.",
  },
];

const Guide = () => {
  const guide = useRef(null);
  const [showGuide, setShowGuide] = useState(true);
  const { setGuideStatus } = useApp();
  const {
    addElement,
    body,
    removeElement,
    title,
    update,
    previousInfo,
    isFinished,
    isRight,
    isBottom,
    removeAll,
    createNewElement,
    isSelector,
  } = useTooltips({
    guideElements,
  });

  useEffect(() => {
    const cloneElement = addElement(guide.current);
    if (!previousInfo) return;
    removeElement(guide.current, cloneElement);
  }, [addElement, previousInfo, removeElement]);

  useEffect(() => {
    window.addEventListener("resize", () => {
      removeAll(guide.current);
      createNewElement(guide.current);
    });
    return () => window.removeEventListener("resize", removeAll);
  }, [createNewElement, removeAll]);

  return (
    <>
      {showGuide && (
        <div
          ref={guide}
          className="w-full h-screen absolute top-0 bg-[rgba(0,0,0,.8)] z-50 overflow-hidden"
        >
          {!isFinished && (
            <Tooltip
              title={title}
              body={body}
              changeInfo={update}
              isRight={isRight}
              isBottom={isBottom}
              isSelector={isSelector}
            />
          )}
          {isFinished && (
            <div
              id="moving-guide"
              className="absolute top-0  z-50  w-full h-full flex justify-center items-center flex-col"
            >
              <p className="max-w-[320px] w-full text-center raleway text-base font-normal leading-5 tracking-[0.64px] text-white mb-2">
                Selecciona y arrastra para mirar alrededor
              </p>
              <img src={icons.mouse} className="w-16 mb-6" />
              <button
                onClick={() => {
                  setShowGuide(false);
                  setGuideStatus(true);
                }}
                className="bg-principal w-[122px] py-[6px] px-3 text-center rounded-3xl monserrat text-sm font-bold	leading-5	"
              >
                Finalizar
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Guide;
