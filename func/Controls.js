import { Vector3 } from "three";
import Map, { createBlock } from "../map/DefualtMap";
import { PointerLockControls } from "./controller";
import { getGravity, setGravity } from "./Physics";
import { convertObjectToKey } from "./positions";
import { changePosition } from "../map/tiles";
let jumpForce = 0;
const maxDis = 2;
const vector = new Vector3();
const controllers = (camera, obj) => {
  const controls = new PointerLockControls(camera, obj);
  let keys = [];

  obj.addEventListener("keydown", keydown);
  obj.addEventListener("keyup", keyup);

  function keydown(e) {
    keys[e.key] = true;
  }
  function keyup(e) {
    keys[e.key] = false;
  }
  obj.addEventListener(
    "click",
    function () {
      controls.lock();
    },
    false
  );
  let j = createBlock(convertObjectToKey({ x: 0, y: 0, z: 0 }));
  const jump = (cam) => {
    jumpForce = 0.1;
    setGravity(false);
  };
  return function (speed) {
    camera.getWorldDirection(vector);
    for (let i = 0; i < maxDis; i += 0.5) {
      const d = vector.multiply(new Vector3(i, i, i)).add(camera.position);
      const a = new Vector3(
        getNearest(d.x, Map.scale),
        getNearest(d.y, Map.scale),
        getNearest(d.z, Map.scale)
      );
      if (Map.exists(convertObjectToKey({ x: a.x, y: a.y, z: a.z }))) {
        j = changePosition(
          convertObjectToKey(j.position),
          convertObjectToKey({ x: a.x, y: a.y, z: a.z })
        );
        break;
      }
    }

    if (jumpForce > 0) {
      camera.position.y += jumpForce;
      jumpForce -= 0.005;
    } else if (!getGravity()) {
      setGravity(true);
    }
    if (keys["w"]) {
      controls.moveForward(speed);
    }
    if (keys["s"]) {
      controls.moveForward(-speed);
    }
    if (keys["a"]) {
      controls.moveRight(-speed);
    }
    if (keys["d"]) {
      controls.moveRight(speed);
    }
    if (keys[" "]) {
      if (Map.onGround(camera.position)) {
        jump(camera);
      }
    }
  };
};

const getNearest = (x, to) => {
  return Math.ceil(x / to) * to;
};
export default controllers;
