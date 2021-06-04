import fetch from 'node-fetch';

const MINIFIED_URL_REGEX = /Minified: (.+)/m;
const CDN_HOST = 'https://cdn.skypack.dev';

/**
 * Gets Skypack pinned URL for package id and version
 *
 * @param {string} id The package id
 * @param {string} version The package version
 * @returns {Promise<string>}
 */
async function getUrl(id, version) {
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
