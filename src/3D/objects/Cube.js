import { Mesh, MeshStandardMaterial, BoxGeometry, TextureLoader, MeshBasicMaterial } from "three";

export class Cube extends Mesh {
	constructor(size, { x, y, z }, loadingManager) {
		super();
		this.geometry = new BoxGeometry(size, size, size);
		const uploadMaterial = new MeshStandardMaterial({
			color: "blue",
		});
		this.material = uploadMaterial;
		this.name = `cube-${size}`;
		this.position.x = x;
		this.position.y = y;
		this.position.z = z;
		this.renderOrder = 0;
		this.loadingManager = loadingManager;
	}

	setMaterial(imgText = "") {
		const texture = new TextureLoader(this.loadingManager).load(imgText);
		const material = new MeshBasicMaterial({ map: texture });
		this.material = material;
	}
}
