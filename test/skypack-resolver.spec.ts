import { readFile } from 'fs/promises';
import { join, dirname } from 'path';
import { expect } from 'chai';
import { describe } from 'mocha';
import sinon from 'sinon';
import { build } from 'esbuild';
// @ts-ignore
import { skypackResolver } from '../index.ts';
// @ts-ignore
import { cdn } from '../src/cdn.ts';

const __dirname = dirname(new URL(import.meta.url).pathname);
const { stub } = sinon;

const CODE_OK = `// test/example/src/render.js
import { render } from "https://cdn.skypack.dev/pin/lit-html@v2.0.0-rc.3-mF2EKOQ7ge0WnKTCrvCT/mode=imports,min/optimized/lit-html.js";

// test/example/src/template.js
import { html } from "https://cdn.skypack.dev/pin/lit-html@v2.0.0-rc.3-mF2EKOQ7ge0WnKTCrvCT/mode=imports,min/optimized/lit-html.js";
var template_default = html\`<p>Hello World!</p>\`;

// test/example/src/render.js
var div = document.createElement("div");
render(template_default, div);
`;

describe('skypack-resolver', async function () {
    describe('skypackResolver', async function () {
        it('ok', async function () {
            const getUrlStub = stub(cdn, 'getUrl').returns(
                'https://cdn.skypack.dev/pin/lit-html@v2.0.0-rc.3-mF2EKOQ7ge0WnKTCrvCT/mode=imports,min/optimized/lit-html.js',
            );

            const entryPoint = join(__dirname, './example/src/render.js');
            const outfile = join(__dirname, './example/dist/bundle.js');
            const packageLockFile = join(__dirname, './example/package-lock.json');

            await build({
                entryPoints: [entryPoint],
                outfile: outfile,
                format: 'esm',
                bundle: true,
                plugins: [skypackResolver(packageLockFile)],
            });
            const code = await (await readFile(outfile)).toString();

            expect(code).to.equal(CODE_OK);
            expect(getUrlStub.callCount).to.equal(1);

            getUrlStub.restore();
        });
    });
});
