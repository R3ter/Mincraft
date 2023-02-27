import * as THREE from "three";
import { convertKeyToObject, convertObjectToKey } from "./../func/positions";
import COLORS from "../STATIC/COLORS";
const AddTilesArray = (tilesArray) => {
  for (let [key, value] of Object.entries(tilesArray)) {
    Map.tiles[key] = value;
  }
};
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
  Map.tiles[pos] = obj;
  return obj;
};
const Map = {
  scale: 0.5,
  tiles: {},
  exists(key) {
    return !!this.tiles[key];
  },
  onGround(position) {
    return !!this.tiles[
      convertObjectToKey({
        x: getNearest(position.x - Map.scale / 4, Map.scale),
        y: getNearest(position.y - Map.scale / 2, Map.scale),
        z: getNearest(position.z - Map.scale / 4, Map.scale),
      })
    ];
  },
};
Array.apply(null, Array(50)).forEach((e, x) => {
  Array.apply(null, Array(50)).forEach((e, z) => {
    createBlock(
      convertObjectToKey({
        x: x * Map.scale,
        y: 0,
        z: z * Map.scale,
      })
    );
  });
});

const setMap = () => {
  AddTilesArray(Map.tiles);
};
const setInitBlocks = (scene) => {
  setMap();
  for (const [key, { mesh }] of Object.entries(Map.tiles)) {
    const pos = convertKeyToObject(key);
    mesh.position.set(pos.x, pos.y - 0.5, pos.z);
    scene.add(mesh);
  }
};

const getNearest = (x, to) => {
  return Math.ceil(x / to) * to;
};
export { setInitBlocks, createBlock };
export default Map;
