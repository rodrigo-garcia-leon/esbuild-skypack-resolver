import fetch from "node-fetch";

const MINIFIED_URL_REGEX = /Minified: (.+)/m;
const CDN_HOST = "https://cdn.skypack.dev";

async function getUrl(id, version) {
  const body = await (await fetch(`${CDN_HOST}/${id}@${version}`)).text();
  const [, url] = body.match(MINIFIED_URL_REGEX);

  return url;
}

export const cdn = {
  getUrl,
};
