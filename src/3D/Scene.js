import { Scene } from "three";
import { Video } from "./objects/Video";

export class MainScene extends Scene {
	constructor(camera) {
		super();
		this.camera = camera;
		this.init();
	}

	init() {
		const element = document.getElementById("video");
		if (!element) return;
		this.video = new Video(element, this.camera);
		this.add(this.video);
		// this.camera
	}

	tick() {
		this.video.tick();
	}
}
