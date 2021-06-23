/**
 * Wrapped setTimeout
 * @param {number} delay (단위: 초)
 * @returns Promise
 */
export const delay = delay =>
  new Promise(resolve => setTimeout(resolve, delay * 1000));

/**
 * Wrapped setTimout, fn 은 마지막에 호출됨
 * @param {function} fn callback
 * @param {number} delay 단위 : 초
 * @returns Promise
 */
export const delayFinally = (fn, delay) =>
  new Promise(resolve => setTimeout(resolve(fn), delay * 1000));

/**
 * Wrapped setInterval
 * @param {function} fn callback
 * @param {number} delay 단위 : 초
 * @returns
 */
export const tick = (fn, delay) =>
  new Promise(resolve => setInterval(resolve(fn), delay * 1000));
