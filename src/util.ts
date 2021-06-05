/* eslint-disable @typescript-eslint/no-explicit-any */

export interface PromiseResolve {
    promise: Promise<any>;
    resolve: (value: any) => void;
}

/**
 * Creates new promise with external resolve
 */
export function newPromiseResolve(): PromiseResolve {
    let resolve = (_: any) => {}; // eslint-disable-line
    const promise = new Promise((_resolve) => {
        resolve = _resolve;
    });

    return { promise, resolve };
}
