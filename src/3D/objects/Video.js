import { Mesh, VideoTexture, SRGBColorSpace, SphereGeometry, MeshBasicMaterial, MathUtils } from "three";

let isUserInteracting = false,
	lon = 0,
	lat = 0,
	phi = 0,
	theta = 0,
	onPointerDownPointerX = 0,
	onPointerDownPointerY = 0,
	onPointerDownLon = 0,
	onPointerDownLat = 0;
const distance = 0.5;

export class Video extends Mesh {
	constructor(domElement, camera) {
		super();
		this.camera = camera;
		const geometry = new SphereGeometry(1, 60, 60);
		geometry.scale(-1, 1, 1);
		domElement.play();
		const texture = new VideoTexture(domElement);
		texture.colorSpace = SRGBColorSpace;
		const material = new MeshBasicMaterial({ map: texture });
		this.geometry = geometry;
		this.material = material;
		this.setListeners();
	}

	onPointerDown(event) {
		isUserInteracting = true;

		onPointerDownPointerX = event.clientX;
		onPointerDownPointerY = event.clientY;

		onPointerDownLon = lon;
		onPointerDownLat = lat;
	}

	onPointerMove(event) {
		if (isUserInteracting === true) {
			lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
			lat = (onPointerDownPointerY - event.clientY) * 0.1 + onPointerDownLat;
		}
	}

	onPointerUp() {
		isUserInteracting = false;
	}

	tick() {
		lat = Math.max(-85, Math.min(85, lat));
		phi = MathUtils.degToRad(90 - lat);
		theta = MathUtils.degToRad(lon);

		this.camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
		this.camera.position.y = distance * Math.cos(phi);
		this.camera.position.z = distance * Math.sin(phi) * Math.sin(theta);

		this.camera.lookAt(0, 0, 0);
	}

	setListeners() {
		window.addEventListener("pointerdown", this.onPointerDown);
		window.addEventListener("pointermove", this.onPointerMove);
		window.addEventListener("pointerup", this.onPointerUp);
	}
}
