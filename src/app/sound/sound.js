/**
 * Used to play stage theme music.
 * @param {string} path - path of the resource.
 */
export default (path) => {
  new Audio(path).play();
};
