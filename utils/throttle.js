export const customThrottle = (func, delay) => {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      func.apply(this, args);
      lastTime = now;
    }
  };
};
