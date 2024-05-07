import { LoadingManager, TextureLoader } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

export const loadingManager = new LoadingManager();
export const textureLoader = new TextureLoader(loadingManager).setPath(`textures/`);
export const loader = new GLTFLoader(loadingManager);
export const dracoloader = new DRACOLoader();
dracoloader.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.5/");
loader.setDRACOLoader(dracoloader);
