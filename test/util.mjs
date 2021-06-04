import { inspect } from "util";
import { expect } from "chai";
import { newPendingPromise } from "../src/util.js";

describe("util", function () {
  describe("newPendingPromise", function () {
    it("ok", async function () {
      const { promise, resolve } = newPendingPromise();

      expect(inspect(promise)).to.equal("Promise { <pending> }");

      resolve("fulfilled");
      await promise;

      expect(inspect(promise)).to.equal("Promise { 'fulfilled' }");
    });
  });
});
