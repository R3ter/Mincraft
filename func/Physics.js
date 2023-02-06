import defaultMap from "../map/DefualtMap";
import { convertObjectToKey } from "./positions";

const getNearest = (x, to) => {
  return Math.ceil(x / to) * to;
};
const Gravity = (cam, scale = 1) => {
  const steppingOn = { ...cam.position };
  if (
    defaultMap.collision(
      cam.position,
      convertObjectToKey({
        x: getNearest(steppingOn.x, defaultMap.scale / 2),
        y: getNearest(steppingOn.y, defaultMap.scale / 2),
        z: getNearest(steppingOn.z, defaultMap.scale / 2),
      })
    )
  ) {
    console.log("wadwd");
  }
};
export { Gravity };
