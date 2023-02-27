import * as THREE from "three";
import { setInitBlocks } from "./map/DefualtMap";
import controllers from "./func/Controls";
import { Gravity } from "./func/Physics";

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

  //setting background image
  const loader = new THREE.CubeTextureLoader();
  loader.setPath("BackgroundImages/");

  const textureCube = loader.load([
    "panorama_2.png",
    "panorama_0.png",
    "panorama_4.png",
    "panorama_5.png",
    "panorama_1.png",
    "panorama_3.png",
  ]);
  scene.background = textureCube;
  //////////////

  return { renderer, camera, scene };
};

const { renderer, camera, scene } = init();
const controller = controllers(camera, document.body);
function update(time) {
  controller(0.02);
  Gravity(camera);
  renderer.render(scene, camera);
}
