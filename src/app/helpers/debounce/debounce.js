/**
 * Used to stop function getting spammed.
 * @param {Function} func - callback function to debounce.
 * @param {number} delay - delay amount.
 */
export default (func, delay) => {
  let timer = 0;
  return function debouncedFn() {
    if (Date.now() - timer > delay) {
      func();
      timer = Date.now();
    }
  };
};
