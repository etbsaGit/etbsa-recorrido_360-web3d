import { Clock } from "three";

const clock = new Clock();

export class Animation {
  constructor(updatables) {
    this.updatables = updatables;
  }

  animateActions() {
    const delta = clock.getDelta();
    for (const object of this.updatables) {
      object.tick(delta);
    }
  }

  removeElement(objectName) {
    this.updatables = this.updatables.filter(
      (object) => object.name !== objectName
    );
  }

  appendElement(object) {
    this.updatables.push(object);
  }

  getUpdatables() {
    return this.updatables;
  }
}
