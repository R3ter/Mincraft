import { convertKeyToObject } from "../func/positions";

const tiles = {};
const addTile = ({ material, geometry, position }) => {
  tiles[position] = { material, geometry };
};
const removeTile = (position) => {
  delete tiles[position];
};
const tilesArray = {
  get: (i) => {
    const result = Object.keys(tiles).map((key) => tiles[key]);
    console.log(result);
    return result[i];
  },
  getAll: () =>
    Object.keys(tiles).map((key) => ({ ...tiles[key], position: key })),
};
const changePosition = (oldPos, newPos) => {
  if (oldPos !== newPos && tiles[oldPos]) {
    tiles[newPos] = tiles[oldPos];
    const obPos = convertKeyToObject(newPos);
    tiles[newPos].position = obPos;
    console.log(tiles[newPos].mesh.position);
    tiles[newPos].mesh.position.set(obPos.x, obPos.y, obPos.z);
    delete tiles[oldPos];
  }
};
const AddTilesArray = (tilesArray) => {
  for (let [key, value] of Object.entries(tilesArray)) {
    tiles[key] = value;
  }
};
export { tilesArray, addTile, removeTile, changePosition, AddTilesArray };
export default tiles;
