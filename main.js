import * as THREE from "three";
import { convertObjectToKey } from "./func/positions";
import { setInitBlocks } from "./map/DefualtMap";
import tiles, { changePosition, tilesArray } from "./map/tiles";

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

function update(time) {
  const tile = tilesArray.get(0);
  console.log("TCL: update -> tile", tile.position);

  changePosition(
    convertObjectToKey(tile.position),
    convertObjectToKey({
      x: tile.position.x + 0.0001,
      y: tile.position.z,
      z: tile.position.z,
    })
  );
  renderer.render(scene, camera);
}
