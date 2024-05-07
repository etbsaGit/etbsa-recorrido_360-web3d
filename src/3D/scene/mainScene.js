import { AmbientLight, Scene, Vector3 } from "three";
import { CameraController } from "../objects/CameraController";
import { Cube } from "../objects/Cube";
import { modelsGeneral, texturesGeneral } from "../../assets";
import { Character } from "../objects/Character";

export class MainScene extends Scene {
	constructor(container, loadingManager) {
		super();
		//* camara es singleton
		this.camera = new CameraController();
		//* loading general
		this.loadingManager = loadingManager;
		//*  metodos
		this.create();
		this.light();
		this.observerListener();
	}
	create() {
		//* normal
		this.cube = new Cube(2, { x: 2, y: 0, z: 0 });
		this.add(this.cube);
		//* texture
		this.cube1 = new Cube(2, { x: -2, y: 0, z: 0 }, this.loadingManager);
		this.cube1.setMaterial(texturesGeneral.ground);
		this.add(this.cube1);
		//* object draco
		this.character = new Character(this.loadingManager, { x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, 0.2, modelsGeneral.character, "character");
		this.add(this.character);
	}

	observerListener() {}

	SceneInitialState() {
		this.camera.control.maxAzimuthAngle = Infinity;
		this.camera.control.minAzimuthAngle = Infinity;
		this.camera.moveCameraToPoint(new Vector3(0.2493, -0.0504, 4.9935), 1, new Vector3(0, 0, 0), () => {
			this.camera.enabledOrbitControls();
		});
	}

	light() {
		this.ambient = new AmbientLight(0xff4040, 2);
		this.add(this.ambient);
	}

	renderAnimations(delta) {
		this.character.renderAnimations(delta);
	}
}
