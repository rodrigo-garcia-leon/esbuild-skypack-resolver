import { inspect } from "util";
import { expect } from "chai";
// @ts-ignore
import { newPromiseResolve } from "../src/util.ts";

describe("util", function () {
  describe("newPromiseResolve", function () {
    it("ok", async function () {
      const { promise, resolve } = newPromiseResolve();

      expect(inspect(promise)).to.equal("Promise { <pending> }");

      resolve("fulfilled");
      await promise;

      expect(inspect(promise)).to.equal("Promise { 'fulfilled' }");
    });
  });
});
