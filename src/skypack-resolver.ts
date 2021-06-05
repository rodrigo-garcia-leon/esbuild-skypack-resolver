// @ts-ignore
import { getDependencies } from './package.ts';
// @ts-ignore
import { cdn } from './cdn.ts';
// @ts-ignore
import { newPromiseResolve, PromiseResolve } from './util.ts';
import { OnResolveResult, Plugin, PluginBuild } from 'esbuild';

const PACKAGE_LOCK_FILE = `${process.cwd()}/package-lock.json`;
const PACKAGE_ID_REGEX = /^@?(([a-z0-9]+-?)+\/?)+$/;

interface Pending {
  [path: string]: PromiseResolve
}

interface Cache {
  [path: string]: string
}

/**
 * Creates new Skypack resolver plugin
 */
export function skypackResolver(packageLockFile = PACKAGE_LOCK_FILE): Plugin {
  const pending: Pending  = {};
  const cache: Cache = {};

  return {
    name: 'skypack-resolver',
    async setup(build: PluginBuild) {
      const dependencies = await getDependencies(packageLockFile);

      build.onResolve({ filter: PACKAGE_ID_REGEX }, async ({ path }): Promise<OnResolveResult> => {
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
