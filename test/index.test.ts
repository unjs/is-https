import type { IncomingMessage } from "node:http";
import { expect, it, describe } from "vitest";
import { isHTTPS } from "../src";

describe("is-https", () => {
  const tests = [
    {
      description: "returns true if `x-forwarded-proto` header is `https`",
      input: [{ headers: { "x-forwarded-proto": "https" } }, true],
      output: true,
    },
    {
      description: "returns true if `req.connection.ecrypted` is truthy",
      input: [{ headers: {}, connection: { encrypted: true } }],
      output: true,
    },
    {
      description:
        "returns undefined if `x-forwarded-proto` header is not `https` and `req.connection.ecrypted` is falsy",
      input: [{ headers: {}, connection: { encrypted: undefined } }, false],
      output: undefined,
    },
    {
      description: "returns false otherwise",
      input: [{ headers: {}, connection: { encrypted: false } }],
      output: false,
    },
  ];

  for (const { description, input, output } of tests) {
    it(description, () => {
      expect(isHTTPS(...(input as unknown as [IncomingMessage, boolean]))).eq(
        output,
      );
    });
  }
});
