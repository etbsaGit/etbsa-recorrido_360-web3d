import { PerspectiveCamera, Scene } from "three";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import { Image } from "../objects/Image";

export class ImageScene extends Scene {
	constructor(camera = new PerspectiveCamera(), container) {
		super();
		this.camera = camera;
		this.container = container;
		this.changeMachine = this.changeMachine.bind(this);
		this.init();
		this.setEvents();
	}

	init() {
		this.image = new Image({ camera: this.camera, container: this.container });
		this.image.updateImageMesh({ up: "5090E_1.jpg", down: "5090E_3.jpg", left: "5090E_2.jpg", right: "5090E_4.jpg", inside: "5090E_5.jpg" });
		this.add(this.image);
	}

	tick() {
		if (this.image) this.image.tick();
	}

	changeMachine(machine) {
		ObserverEmitter.emit(EVENTS.initLoading, true);
		this.image.updateImageMesh({
			up: `${machine}_1.jpg`,
			down: `${machine}_3.jpg`,
			left: `${machine}_2.jpg`,
			right: `${machine}_4.jpg`,
			inside: `${machine}_5.jpg`,
		});
	}

	setEvents() {
		ObserverEmitter.on(EVENTS.changeView, this.image.changeView);
		ObserverEmitter.on(EVENTS.changeMachine, this.changeMachine);
	}
}
