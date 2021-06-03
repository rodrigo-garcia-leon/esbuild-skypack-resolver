import { readFile } from "fs/promises";
import { join, dirname } from "path";
import { expect } from "chai";
import { describe } from "mocha";
import { build } from "esbuild";
import { skypackResolver } from "../index.js";

const __dirname = dirname(new URL(import.meta.url).pathname);

const CODE = `// test/example/index.js
import { html, render } from "https://cdn.skypack.dev/pin/lit-html@v2.0.0-rc.3-mF2EKOQ7ge0WnKTCrvCT/mode=imports,min/optimized/lit-html.js";
var div = document.createElement("div");
render(html\`<p>Hello World!</p>\`, div);
`;

describe("skypackResolver", async function () {
  it("ok", async function () {
    const entryPoint = join(__dirname, "./example/index.js");
    const outfile = join(__dirname, "./example/dist/index.js");
    const packageLockFile = join(__dirname, "./example/package-lock.json");

    await build({
      entryPoints: [entryPoint],
      outfile,
      format: "esm",
      bundle: true,
      plugins: [skypackResolver({ packageLockFile })],
    });
    const code = await (await readFile(outfile)).toString();

    expect(code).to.equal(CODE);
  });
});
