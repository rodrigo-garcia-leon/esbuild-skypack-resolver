import fetch from "node-fetch";
import { getDependencies } from "./dependencies.js";

const PACKAGE_LOCK_FILE = `${process.cwd()}/package-lock.json`;
const PACKAGE_ID_REGEX = /^@?(([a-z0-9]+-?)+\/?)+$/;
const MINIFIED_URL_REGEX = /Minified: (.+)/m;
const CDN_HOST = "https://cdn.skypack.dev";

export function skypackResolver({ packageLockFile = PACKAGE_LOCK_FILE } = {}) {
  const pending = {};
  const cache = {};

  return {
    name: "skypack-resolver",
    async setup(build) {
      const dependencies = await getDependencies(packageLockFile);

      build.onResolve({ filter: PACKAGE_ID_REGEX }, async ({ path }) => {
        if (pending[path]) {
          await pending[path].promise;
        }

        if (path in cache) {
          return { path: cache[path], external: true };
        }

        pending[path] = (function () {
          let resolve;
          const promise = new Promise((_resolve) => {
            resolve = _resolve;
          });

          return { promise, resolve };
        })();

        const version = dependencies[path];
        const body = await (
          await fetch(`${CDN_HOST}/${path}@${version}`)
        ).text();
        const [, url] = body.match(MINIFIED_URL_REGEX);

        cache[path] = url;
        pending[path].resolve();

        return { path: url, external: true };
      });
    },
  };
}
