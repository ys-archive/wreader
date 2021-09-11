/**
 * Wrapped setTimeout
 * @param {number} delay (단위: 초)
 * @returns Promise
 */
export const delay = delay =>
  new Promise(resolve => setTimeout(resolve, delay * 1000));

/**
 * Wrapped setTimout, fn 은 마지막에 호출됨
 * @param {number} delay 단위 : 초
 * @param {function} fn callback
 * @returns Promise
 */
export const delayFinally = (delay, fn) =>
  new Promise(resolve => setTimeout(resolve(fn), delay * 1000));

/**
 * Wrapped setInterval
 * @param {number} delay 단위 : 초
 * @param {function} fn callback
 * @returns
 */
export const tick = (delay, fn) =>
  new Promise(resolve => setInterval(resolve(fn), delay * 1000));
