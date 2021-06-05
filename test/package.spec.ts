import { join, dirname } from "path";
import { expect } from "chai";
import { describe } from "mocha";
// @ts-ignore
import { getDependencies } from "../src/package.ts";

const __dirname = dirname(new URL(import.meta.url).pathname);

describe("package", function () {
  describe("getDependencies", function () {
    it("ok", async function () {
      const file = join(__dirname, "./example/package-lock.json");
      const dependencies = await getDependencies(file);

      expect(dependencies).to.deep.equal({
        "@lit/reactive-element": "1.0.0-rc.2",
        "@types/trusted-types": "1.0.6",
        lit: "2.0.0-rc.2",
        "lit-element": "3.0.0-rc.2",
        "lit-html": "2.0.0-rc.3",
      });
    });
  });
});
