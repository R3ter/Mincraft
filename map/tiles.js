import { convertKeyToObject } from "../func/positions";
import Map from "./DefualtMap";

const addTile = ({ material, geometry, position }) => {
  Map.tiles[position] = { material, geometry };
};
const removeTile = (position) => {
  delete Map.tiles[position];
};
const tilesArray = {
  get: (i) => {
    const result = Object.keys(Map.tiles).map((key) => Map.tiles[key]);
    return result[i];
  },
  getAll: () =>
    Object.keys(Map.tiles).map((key) => ({ ...Map.tiles[key], position: key })),
};
const changePosition = (oldPos, newPos) => {
  if (oldPos !== newPos && Map.tiles[oldPos]) {
    Map.tiles[newPos] = Map.tiles[oldPos];
    const obPos = convertKeyToObject(newPos);
    Map.tiles[newPos].position = obPos;
    Map.tiles[newPos].mesh.position.set(obPos.x, obPos.y, obPos.z);
    delete Map.tiles[oldPos];
  }
  return Map.tiles[newPos];
};
const AddTilesArray = (tilesArray) => {
  for (let [key, value] of Object.entries(tilesArray)) {
    Map.tiles[key] = value;
  }
};
export { tilesArray, addTile, removeTile, changePosition, AddTilesArray };
export default Map.tiles;
