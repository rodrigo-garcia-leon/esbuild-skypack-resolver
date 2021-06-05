import { readFile } from 'fs/promises';

interface PackageDependencies {
    [id: string]: {
        dev: boolean;
        version: string;
    };
}

interface Dependencies {
    [id: string]: string;
}

/**
 * Gets dependencies id and version from package lock file
 */
export async function getDependencies(file: string): Promise<Dependencies> {
    const { dependencies }: { dependencies: PackageDependencies } = JSON.parse((await readFile(file)).toString());

    return Object.fromEntries(
        Object.entries(dependencies)
            .filter(([, { dev }]) => !dev)
            .map(([id, { version }]) => [id, version]),
    );
}
