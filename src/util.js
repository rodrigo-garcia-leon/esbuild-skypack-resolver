/** @typedef {{ promise: Promise<any>; resolve: (value: any) => void; }} PromiseResolve */

/**
 * Creates new promise with external resolve
 *
 * @returns {PromiseResolve}
 */
export function newPromiseResolve() {
  /** @type {(value: any) => void} */
  let resolve = () => {};
  const promise = new Promise(_resolve => {
    resolve = _resolve;
  });

  return { promise, resolve };
}
