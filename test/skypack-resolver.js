import { readFile } from "fs/promises";
import { join } from "path";
import { expect } from "chai";
import { describe } from "mocha";
import { build } from "esbuild";
import { getDependencies } from "../src/dependencies.js";
import { skypackResolver } from "../index.js";

const CODE = `// test/example/index.js
import { html, render } from "https://cdn.skypack.dev/pin/lit-html@v2.0.0-rc.3-mF2EKOQ7ge0WnKTCrvCT/mode=imports,min/optimized/lit-html.js";
var div = document.createElement("div");
render(html\`<p>Hello World!</p>\`, div);
`;

describe("skypackResolver", async function () {
  it("ok", async function () {
    const file = join(__dirname, "./example/package-lock.json");
    const dependencies = await getDependencies(file);
    const outfile = join(__dirname, "./example/dist/index.js");

    await build({
      entryPoints: [join(__dirname, "./example/index.js")],
      outfile,
      format: "esm",
      bundle: true,
      plugins: [skypackResolver({ dependencies })],
    });
    const code = await (await readFile(outfile)).toString();

    expect(code).to.equal(CODE);
  });
});
