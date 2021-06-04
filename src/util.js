export function newPendingPromise() {
  let resolve;
  const promise = new Promise((_resolve) => {
    resolve = _resolve;
  });

  return { promise, resolve };
}
