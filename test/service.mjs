import { expect } from "chai";
import { describe } from "mocha";
import { service } from "../src/service.js";

describe("service", function () {
  describe("getUrl", function () {
    it("ok", async function () {
      const url = await service.getUrl("lit-html", "^2.0.0-rc.3");

      expect(url).to.equal(
        "https://cdn.skypack.dev/pin/lit-html@v2.0.0-rc.3-mF2EKOQ7ge0WnKTCrvCT/mode=imports,min/optimized/lit-html.js"
      );
    });
  });
});
