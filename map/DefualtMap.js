import * as THREE from "three";
import { AddTilesArray } from "./tiles";
import { convertKeyToObject, convertObjectToKey } from "./../func/positions";

const createBlock = (pos) => {
  const obj = {};
  obj.material = new THREE.MeshNormalMaterial();
  obj.geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
  obj.position = convertKeyToObject(pos);
  return obj;
};
const defaultMap = {
  "0,0,0": createBlock("0,0,0"),
  "0.3,0,0": createBlock("0.3,0,0"),
};

const setDefaultMap = () => {
  AddTilesArray(defaultMap);
};
const setInitBlocks = (scene) => {
  setDefaultMap();
  for (const [key, { material, geometry, position, mesh }] of Object.entries(
    defaultMap
  )) {
    const pos = convertKeyToObject(key);
    mesh.position.set(pos.x, pos.y, pos.z);
    scene.add(mesh);
  }
};

export { setInitBlocks };
export default defaultMap;
