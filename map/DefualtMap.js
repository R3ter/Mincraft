import * as THREE from "three";
import { AddTilesArray } from "./tiles";
import { convertKeyToObject, convertObjectToKey } from "./../func/positions";
import COLORS from "../STATIC/COLORS";
const blocks = {
  dirt: {
    material: () => {
      const loader = new THREE.TextureLoader();
      const text1 = loader.load("textures/DirtTop.jpg");
      const text2 = loader.load("textures/DirtSide.jpg");
      const martialSide = new THREE.MeshBasicMaterial({
        map: text2,
        color: COLORS.white,
      });
      return [
        martialSide,
        martialSide,
        new THREE.MeshBasicMaterial({ map: text1 }),
        new THREE.MeshBasicMaterial({ map: text1 }),
        martialSide,
        martialSide,
      ];
    },
  },
};
const createBlock = (pos, block = "dirt") => {
  const obj = {};
  obj.material = blocks[block].material();
  obj.geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
  obj.mesh = new THREE.Mesh(obj.geometry, obj.material);
  obj.position = convertKeyToObject(pos);
  defaultMap.tiles[pos] = obj;
  return obj;
};
const defaultMap = {
  scale: 0.5,
  tiles: {},
  collision(position, boxKey) {
    return !!this.tiles[boxKey];
    // return (
    //   position.x >= this.tiles[boxKey].position.x - this.scale / 2 &&
    //   position.x <= this.tiles[boxKey].position.x + this.scale / 2 &&
    //   position.y >= this.tiles[boxKey].position.y - this.scale / 2 &&
    //   position.y <= this.tiles[boxKey].position.y + this.scale / 2 &&
    //   position.z >= this.tiles[boxKey].position.z - this.scale / 2 &&
    //   position.z <= this.tiles[boxKey].position.z + this.scale / 2
    // );
  },
};
Array.apply(null, Array(50)).forEach((e, x) => {
  Array.apply(null, Array(50)).forEach((e, z) => {
    createBlock(
      convertObjectToKey({
        x: x * defaultMap.scale,
        y: 0,
        z: z * defaultMap.scale,
      })
    );
  });
});

const setDefaultMap = () => {
  AddTilesArray(defaultMap.tiles);
};
const setInitBlocks = (scene) => {
  setDefaultMap();
  for (const [key, { mesh }] of Object.entries(defaultMap.tiles)) {
    const pos = convertKeyToObject(key);
    mesh.position.set(pos.x, pos.y - 0.5, pos.z);
    scene.add(mesh);
  }
};

export { setInitBlocks };
export default defaultMap;
