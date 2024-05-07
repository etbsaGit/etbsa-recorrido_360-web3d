import { PerspectiveCamera, SRGBColorSpace, WebGLRenderer } from "three";
import { ImageScene } from "./scenes/ImageScene";
import { Animation } from "./Animation";
import { MainScene } from "./Scene";

export class App {
	constructor(container) {
		this.container = container;
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		const aspect = width / height;
		this.renderer = new WebGLRenderer({ antialias: true });
		this.container.append(this.renderer.domElement);
		this.camera = new PerspectiveCamera(75, aspect, 0.1, 1100);
		this.camera.rotateY(180);
		this.mainScene = new MainScene(this.camera);
		this.imageScene = new ImageScene(this.camera, container);
		this.animation = new Animation([this.imageScene]);
	}

	init() {
		this.initRenderer();
		this.initCamera();
		this.setListeners();
		this.startAnimation();
	}

	initRenderer() {
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		this.renderer.localClippingEnabled = true;
		this.renderer.outputColorSpace = SRGBColorSpace;
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
		this.renderer.localClippingEnabled = true;
	}

	initCamera() {
		// this.camera.position.set(0, 0, 800);
	}

	startAnimation() {
		this.renderer.setAnimationLoop(() => {
			this.animation.animateActions();
			this.renderer.render(this.imageScene, this.camera);
		});
	}

	stopAnimation() {
		this.renderer.setAnimationLoop(null);
	}

	setResize() {
		const width = this.container.clientWidth;
		const height = this.container.clientHeight;
		this.camera.aspect = width / height;
		this.camera.updateProjectionMatrix();
		this.camera.matrixWorldNeedsUpdate = true;
		this.renderer.setSize(width, height);
		this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
	}

	setListeners() {
		window.addEventListener("resize", () => {
			this.setResize();
		});
	}
}
