import { join } from "path";
import { expect } from "chai";
import { describe } from "mocha";
import { getDependencies } from "../src/dependencies.js";

const DEPENDENCIES = {
  "@lit/reactive-element": "1.0.0-rc.2",
  "@types/trusted-types": "1.0.6",
  lit: "2.0.0-rc.2",
  "lit-element": "3.0.0-rc.2",
  "lit-html": "2.0.0-rc.3",
};

describe("getDependencies", function () {
  it("ok", async function () {
    const file = join(__dirname, "./example/package-lock.json");
    const dependencies = await getDependencies(file);

    expect(dependencies).to.deep.equal(DEPENDENCIES);
  });
});
