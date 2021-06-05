import { getDependencies } from './package.js';
import { cdn } from './cdn.js';
import { newPromiseResolve } from './util.js';

const PACKAGE_LOCK_FILE = `${process.cwd()}/package-lock.json`;
const PACKAGE_ID_REGEX = /^@?(([a-z0-9]+-?)+\/?)+$/;

/**
 * Creates new Skypack resolver plugin
 *
 * @param {string} packageLockFile The package lock file to get dependencies from
 * @returns {import("esbuild").Plugin}
 */
export function skypackResolver(packageLockFile = PACKAGE_LOCK_FILE) {
  /** @type {Object.<string, import("./util.js").PromiseResolve>} */
  const pending = {};
  /** @type {Object.<string, string>} */
  const cache = {};

  return {
    name: 'skypack-resolver',
    async setup(build) {
      const dependencies = await getDependencies(packageLockFile);

      build.onResolve({ filter: PACKAGE_ID_REGEX }, async ({ path }) => {
        if (pending[path]) {
          await pending[path].promise;
        }

        if (path in cache) {
          return { path: cache[path], external: true };
        }

        pending[path] = newPromiseResolve();

        const version = dependencies[path];
        const url = await cdn.getUrl(path, version);

        cache[path] = url;
        pending[path].resolve(null);

        return { path: url, external: true };
      });
    },
  };
}
