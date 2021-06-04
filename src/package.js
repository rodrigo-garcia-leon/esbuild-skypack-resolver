import { readFile } from 'fs/promises';

/**
 * Gets dependencies id and version from package lock file
 *
 * @param {string} file The package lock file path
 * @returns {Promise<{ [id: string]: string; }>}
 */
export async function getDependencies(file) {
  const { dependencies } = JSON.parse((await readFile(file)).toString());

  return Object.fromEntries(
    Object.entries(dependencies)
      .filter(([, { dev }]) => !dev)
      .map(([id, { version }]) => [id, version]),
  );
}
