import { Mesh, MeshBasicMaterial, SphereGeometry, MathUtils, SRGBColorSpace } from "three";
import ObserverEmitter, { EVENTS } from "../../helper/Observer";
import { textureLoader } from "../utils";

export class Image extends Mesh {
	constructor({ camera, container }) {
		super();

		this.container = container;
		this.camera = camera;
		this.up = null;
		this.down = null;
		this.left = null;
		this.right = null;
		this.inside = null;
		this.moveCamera = this.moveCamera.bind(this);
		this.changeView = this.changeView.bind(this);
		this.movingStatus = false;
		this.isUserInteracting = false;
		this.onPointerDownMouseX = 0;
		this.onPointerDownMouseY = 0;
		this.lon = 0;
		this.onPointerDownLon = 0;
		this.lat = 0;
		this.onPointerDownLat = 0;
		this.phi = 0;
		this.theta = 0;
		this.onAfterRender(() => {
			console.log("vemooo");
		});
		this.init();
		this.listeners();
	}

	async init() {
		const geometry = new SphereGeometry(800, 160, 120);
		geometry.scale(-1, 1, 1);
		const material = new MeshBasicMaterial({});
		this.geometry = geometry;
		this.material = material;
	}

	async updateImageMesh({ up, down, left, right, inside }) {
		this.lon = 180;
		await this.setImages({ up, down, left, right, inside });
		this.material = new MeshBasicMaterial({ map: this.up });
	}

	async setImages({ up, down, left, right, inside }) {
		try {
			const [newup, newright, newdown, newleft, newinside] = await this.getImages({ up, down, left, right, inside });
			newup.colorSpace = SRGBColorSpace;
			this.up = newup;
			newdown.colorSpace = SRGBColorSpace;
			this.down = newdown;
			newleft.colorSpace = SRGBColorSpace;
			this.left = newleft;
			newright.colorSpace = SRGBColorSpace;
			this.right = newright;
			newinside.colorSpace = SRGBColorSpace;
			this.inside = newinside;
		} catch (error) {
			console.log(error);
		} finally {
			ObserverEmitter.emit(EVENTS.loadingComplete);
		}
	}
	loadTexture(url) {
		return new Promise((resolve, reject) => {
			textureLoader.load(
				url,
				(textura) => {
					resolve(textura);
				},
				undefined,
				(error) => {
					reject(error);
				}
			);
		});
	}

	async getImages({ up, down, left, right, inside }) {
		return await Promise.all([
			textureLoader.loadAsync(up),
			textureLoader.loadAsync(right),
			textureLoader.loadAsync(down),
			textureLoader.loadAsync(left),
			textureLoader.loadAsync(inside),
		]);
	}

	tick() {
		this.updatingView();
		this.camera.rotation.y += 0.06;
	}

	setNewView(event) {
		this.onPointerDownMouseX = event.clientX;
		this.onPointerDownMouseY = event.clientY;

		this.onPointerDownLon = this.lon;
		this.onPointerDownLat = this.lat;
	}

	updatingView() {
		this.lat = Math.max(-85, Math.min(85, this.lat));
		this.phi = MathUtils.degToRad(100 - this.lat);
		this.theta = MathUtils.degToRad(this.lon);

		const x = 1000 * Math.sin(this.phi) * Math.cos(this.theta);
		const y = 1000 * Math.cos(this.phi);
		const z = 1000 * Math.sin(this.phi) * Math.sin(this.theta);

		this.camera.lookAt(x, y, z);
	}
	moveCamera(event) {
		if (!this.movingStatus) return;
		if (event.isPrimary === false) return;
		this.lon = (this.onPointerDownMouseX - event.clientX) * 0.1 + this.onPointerDownLon;
		this.lat = (event.clientY - this.onPointerDownMouseY) * 0.1 + this.onPointerDownLat;
	}

	setMovingStatus(value) {
		this.movingStatus = value;
	}

	goInside() {
		this.material.map = this.inside;
		ObserverEmitter.emit(EVENTS.changeCompleted);
	}
	goOutside() {
		this.material.map = this.right;
		ObserverEmitter.emit(EVENTS.changeCompleted);
	}

	changeView(value) {
		const views = {
			1: this.up,
			2: this.right,
			3: this.down,
			4: this.left,
			5: this.inside,
		};
		const view = views[value];
		this.material.map = view;
		this.material.needsUpdate = true;
		ObserverEmitter.emit(EVENTS.changeCompleted);
		this.lon = 180;
	}

	listeners() {
		this.container.addEventListener("pointerdown", (event) => {
			this.onPointerDownMouseX = event.clientX;
			this.onPointerDownMouseY = event.clientY;

			this.onPointerDownLon = this.lon;
			this.onPointerDownLat = this.lat;
			this.setMovingStatus(true);
		});
		this.container.addEventListener("pointerup", () => {
			this.setMovingStatus(false);
		});
		this.container.addEventListener("pointermove", this.moveCamera);
	}
}
