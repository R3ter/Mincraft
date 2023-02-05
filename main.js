import * as THREE from "three";
import controllers from "./func/Controls";
import { setInitBlocks } from "./map/DefualtMap";

const init = () => {
  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.z = 1;

  const scene = new THREE.Scene();
  setInitBlocks(scene);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setAnimationLoop(update);
  document.body.appendChild(renderer.domElement);
  return { renderer, camera, scene };
};

const { renderer, camera, scene } = init();
const controller = controllers(camera, document.body);
function update(time) {
  controller(0.02);

  renderer.render(scene, camera);
}
