import { GUI } from "dat.gui";
import { gsap } from "gsap";
import { PerspectiveCamera } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// import { FirstPersonControls } from "three/examples/jsm/controls/FirstPersonControls";
export class CameraController extends PerspectiveCamera {
	constructor(fov, relation, near, far, container, doomElement) {
		super();
		if (CameraController.instance) {
			return CameraController.instance;
		}
		CameraController.instance = this;
		this.doomElement = doomElement;
		this.fov = fov;
		this.aspect = relation;
		this.far = far;
		this.near = near;
		this.orbitsEnabled = true;
		this.createControls(container);
		//* helper para la camara
		this.helper();
	}

	createControls(container) {
		this.control = new OrbitControls(this, container);
		this.control.target.set(0, 0, 0);
		this.control.rotateSpeed = 0.4;
		this.control.dampingFactor = 0.5;
	}

	disabledOrbitControls() {
		this.control.enabled = false;
		this.orbitsEnabled = false;
	}

	enabledOrbitControls() {
		this.control.enabled = true;
		this.orbitsEnabled = true;
	}

	helper() {
		const gui = new GUI();
		const cameraControls = gui.addFolder("camera");
		cameraControls.add(this.position, "x", -300, 300).step(0.0001).listen().name("Posicion X");
		cameraControls.add(this.position, "y", -1000, 1000).step(0.0001).listen().name("Posicion Y");
		cameraControls.add(this.position, "z", -900, 100).step(0.0001).listen().name("Posicion Z");
		cameraControls.add(this.rotation, "x", -5.0, 5.0).step(0.0001).listen().name("Rotación X");
		cameraControls.add(this.rotation, "y", -5.0, 5.0).step(0.0001).listen().name("Rotación Y");
		cameraControls.add(this.rotation, "z", -5.0, 5.0).step(0.0001).listen().name("Rotación Z");
		// cameraControls.open();
		const controls = gui.addFolder("controls");
		controls.add(this.control.target, "x", -300, 300).step(0.001).listen().name("Target X");
		controls.add(this.control.target, "y", -700, 700).step(0.001).listen().name("Target Y");
		controls.add(this.control.target, "z", -300, 300).step(0.001).listen().name("Target Z");
		controls.add(this.control, "maxAzimuthAngle", -4, 4).step(0.001).listen().name("maxAzimuthAngle");
		controls.add(this.control, "minAzimuthAngle", -4, 4).step(0.001).listen().name("minAzimuthAngle");
		// controls.open();
	}

	/**
	 * Mueve la cámara a un punto específico y ajusta su objetivo.
	 *
	 * @param {Vector3} point - El punto al que se moverá la cámara (debe ser una instancia de Vector3) partiendo de la posición actual de la cámara.
	 * @param {number} duration - Duración de la animación de movimiento (opcional, por defecto 1 segundo).
	 * @param {Vector3} target - El objetivo de la cámara al que se ajustará (debe ser una instancia de Vector3) proveniente de la propiedad "target" del controlador de la cámara.
	 * @param {() => void} callBack - Función de devolución de llamada que se ejecutará cuando se complete la animación (opcional).
	 *
	 * @example
	 * // Asegúrate de que la cámara tenga libertad de movimiento horizontal.
	 * this.camera.control.maxAzimuthAngle = Infinity;
	 * this.camera.control.minAzimuthAngle = Infinity;
	 *
	 * // Mueve la cámara a la posición (0.2493, -0.0504, 4.9935) en 1 segundo y ajusta el objetivo a (0, 0, 0).
	 * this.camera.moveCameraToPoint(new Vector3(0.2493, -0.0504, 4.9935), 1, new Vector3(0, 0, 0), () => {
	 *     // Una vez que la animación esté completa, habilita los controles de órbita de la cámara.
	 *     this.camera.enabledOrbitControls();
	 * });
	 */

	moveCameraToPoint(point, duration = 1, target, callBack = () => {}) {
		// Clonar el punto final para evitar modificar el punto original.
		const endPosition = point.clone();

		// Crear una línea de tiempo con GSAP para animar el movimiento de la cámara.
		const timeline = gsap.timeline();

		// Animar la posición de la cámara hacia el punto final.
		timeline.to(this.position, {
			duration,
			x: endPosition.x,
			y: endPosition.y,
			z: endPosition.z,
			onComplete: () => {
				// Ejecutar la función de devolución de llamada cuando se complete la animación.
				callBack();
			},
		});

		// Animar el objetivo de la cámara hacia el objetivo deseado, con un retraso de "duration" segundos.
		timeline.to(
			this.control.target,
			{
				duration,
				x: target.x,
				y: target.y,
				z: target.z,
			},
			`-=${duration}`
		);

		// Iniciar la línea de tiempo para comenzar la animación.
		timeline.play();
	}

	update(delta) {
		if (this.orbitsEnabled) {
			this.control.update();
		}
	}
}
