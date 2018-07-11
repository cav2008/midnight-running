/**
 * Used to get a random number up to a passed max number.
 * @param {number} max - up to number.
 */
export default (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};
