import { PointerLockControls } from "./controller";

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
  return function (speed) {
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
  };
};
export default controllers;
