import Map from "../map/DefualtMap";
let gravity = true;

const Gravity = (cam, scale = 1) => {
  if (gravity && !Map.onGround(cam.position)) {
    cam.position.y -= 0.05 * scale;
  }
};
const setGravity = (bool) => {
  gravity = bool;
};
const getGravity = () => {
  return gravity;
};
export { Gravity, setGravity, getGravity };
