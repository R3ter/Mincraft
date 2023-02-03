const convertKeyToObject = (str) => {
  const a = str.split(",");
  return { x: +a[0], y: +a[1], z: +a[2] };
};
const convertObjectToKey = ({ x, y, z }) => {
  return x + "," + y + "," + z;
};
export { convertKeyToObject, convertObjectToKey };
