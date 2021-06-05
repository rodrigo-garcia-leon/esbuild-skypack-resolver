import fetch from 'node-fetch';

const MINIFIED_URL_REGEX = /Minified: (.+)/m;
const CDN_HOST = 'https://cdn.skypack.dev';

/**
 * Gets Skypack pinned URL for package id and version
 */
async function getUrl(id: string, version: string): Promise<string> {
    const body = await (await fetch(`${CDN_HOST}/${id}@${version}`)).text();
    const matches = body.match(MINIFIED_URL_REGEX);

    if (!matches) {
        throw new Error(`Skypack pinned URL not found for package ${id}@${version}`);
    }

    const [, url] = matches;
    return url;
}

export const cdn = {
    getUrl,
};
