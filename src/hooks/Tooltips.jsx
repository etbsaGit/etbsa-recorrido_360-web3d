import gsap from "gsap";
import { useCallback, useState } from "react";

const useTooltips = ({ guideElements = [] }) => {
  const [index, setIndex] = useState(0);
  // eslint-disable-next-line no-unused-vars
  const [nodeInformation, _] = useState(guideElements);
  const [isFinished, setIsFinished] = useState(false);

  const getScreenPosition = (id) => {
    const resaltar = document.getElementById(id);
    const cloneElement = resaltar.cloneNode(true);
    const rect = resaltar.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;

    return { cloneElement, top, left, rect, resaltar };
  };

  const setClonePosition = ({ cloneElement, top, left }) => {
    cloneElement.style.position = "absolute";
    cloneElement.style.top = top + "px";
    cloneElement.style.left = left + "px";
    cloneElement.style.cursor = "default";

    return cloneElement;
  };

  const createNewElement = (parent, isResize = false) => {
    if (!nodeInformation[index]) return;
    const { id, isRight = true, isBottom, isSelector } = nodeInformation[index];
    const {
      top,
      left,
      rect,
      resaltar,
      cloneElement: element,
    } = getScreenPosition(id);

    const cloneElement = setClonePosition({ cloneElement: element, top, left });

    const newId = `${resaltar.id}-clone`;
    cloneElement.id = newId;
    parent.appendChild(cloneElement);
    if (!parent) return;
    parent.firstChild.style.position = "absolute";
    const parentTop = rect.top - 25 + "px";

    gsap.to(parent.firstChild.style, {
      top: isSelector
        ? `${rect.top - 80}px`
        : isBottom
        ? `${rect.top - 95}px`
        : parentTop,
      left: isSelector
        ? `${rect.right - 870}px`
        : isRight
        ? `${rect.right + 5}px`
        : `${rect.right - 420}px`,
      //   left: isSelector ? `${rect.right - 920}px` : isRight?
      //   left: isRight ? `${rect.right + 5}px` : `${rect.right - 920}px`,
      duration: isResize ? 0 : 0.7,
    });

    return cloneElement;
  };
  const addElement = (parent) => {
    if (nodeInformation.length === 0) return;
    if (index === nodeInformation.length || !nodeInformation[index]) {
      removeChildren(parent);
      setIsFinished(true);
      return;
    }

    return createNewElement(parent);
  };

  const removeElement = (parent, cloneElement) => {
    if (!parent) return;
    if (!parent.firstChild) return;
    let firstChild = parent.firstChild;
    let lastChild = parent.lastChild;
    if (!firstChild || !lastChild) return;
    while (firstChild.id !== lastChild.id && parent.children.length !== 2) {
      if (parent.children[1] === cloneElement.newId) return;

      parent.removeChild(parent.children[1]);
      lastChild = parent.lastChild;
    }
  };

  const removeChildren = (parent) => {
    if (!parent) return;
    let firtsChild = parent.firstChild;
    let lastChild = parent.lastChild;
    let index = 0;
    while (firtsChild && index < 10) {
      if (lastChild.id === "moving-guide") return;
      try {
        parent.removeChild(lastChild);
      } catch (e) {
        console.log("error", e.message);
      } finally {
        index++;
        firtsChild = parent.firstChild;
      }
    }
  };

  const removeAll = useCallback((parent) => {
    if (!parent) return;
    let firstChild = parent.firstChild;
    let lastChild = parent.lastChild;
    if (!firstChild || !lastChild) return;
    while (firstChild.id !== lastChild.id) {
      parent.removeChild(lastChild);
      lastChild = parent.lastChild;
    }
  }, []);

  return {
    index,
    removeAll,
    isFinished,
    addElement,
    removeElement,
    createNewElement,
    isSelector: nodeInformation[index]
      ? nodeInformation[index].isSelector
      : null,
    id: nodeInformation[index] ? nodeInformation[index].id : null,
    title: nodeInformation[index] ? nodeInformation[index].title : null,
    body: nodeInformation[index] ? nodeInformation[index].body : null,
    previousInfo: guideElements[index - 1],
    isRight: nodeInformation[index] ? nodeInformation[index].isRight : null,
    isBottom: nodeInformation[index] ? nodeInformation[index].isBottom : null,
    update: () => setIndex((index) => index + 1),
  };
};

export default useTooltips;
