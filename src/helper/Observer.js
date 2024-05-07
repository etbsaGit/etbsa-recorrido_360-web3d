import EventEmitter from "eventemitter3";

export const EVENTS = {
	goInside: "goInside",
	goOutside: "goOutside",
	changeView: "changeView",
	initLoading: "initLoading",
	changeMachine: "changeMachine",
	loadingComplete: "loadingComplete",
	changeCompleted: "changeCompleted",
	onChangeMachineInfo: "onChangeMachineInfo",
};

const ObserverEmitter = new EventEmitter();
export default ObserverEmitter;
