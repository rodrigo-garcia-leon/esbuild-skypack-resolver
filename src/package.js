import { readFile } from "fs/promises";


export async function getDependencies(file) {
  const { dependencies } = JSON.parse((await readFile(file)).toString());

  return Object.fromEntries(
    Object.entries(dependencies)
      .filter(([, { dev }]) => !dev)
      .map(([id, { version }]) => [id, version])
  );
}
