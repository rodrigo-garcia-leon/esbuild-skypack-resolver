export interface PromiseResolve {
  promise: Promise<any>,
  resolve: (value: any) => void
}

/**
 * Creates new promise with external resolve
 */
export function newPromiseResolve(): PromiseResolve {
  let resolve = (_: any) => {};
  const promise = new Promise(_resolve => {
    resolve = _resolve;
  });

  return { promise, resolve };
}
