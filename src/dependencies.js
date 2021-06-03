import { readFile } from "fs/promises";

const PACKAGE_LOCK_FILE = `${process.cwd()}/package-lock.json`;

export async function getDependencies(file = PACKAGE_LOCK_FILE) {
  const { dependencies } = JSON.parse((await readFile(file)).toString());

  return Object.fromEntries(
    Object.entries(dependencies)
      .filter(([, { dev }]) => !dev)
      .map(([id, { version }]) => [id, version])
  );
}
