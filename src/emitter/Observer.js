import EventEmitter from "eventemitter3";

export const EVENTS = {
	init_mainMenu: "init_mainMenu",
	initLoading: "initLoading",
	loadingComplete: "loadingComplete",
	showMenuAnimations: "showMenuAnimations",
};

const ObserverEmitter = new EventEmitter();
export default ObserverEmitter;
