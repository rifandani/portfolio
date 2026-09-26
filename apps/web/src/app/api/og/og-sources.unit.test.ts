import { describe, expect, it } from "vitest";

import { previewSourceOf } from "./og-sources";

const PUBLIC = "/app/public";

describe("previewSourceOf", () => {
  it("reads a root-relative image from public", () => {
    expect(previewSourceOf("/placeholders/a.svg", PUBLIC)).toEqual({
      kind: "file",
      file: "/app/public/placeholders/a.svg",
      type: "image/svg+xml",
    });
  });

  it("passes an https source through", () => {
    expect(previewSourceOf("https://cdn.test/a.png", PUBLIC)).toEqual({
      kind: "remote",
      url: "https://cdn.test/a.png",
    });
  });

  it.each([
    "/../secrets/a.png",
    "/placeholders/../../a.png",
    "placeholders/a.png",
    "http://cdn.test/a.png",
    "/cv.pdf",
  ])("has no source for %s", (src) => {
    expect(previewSourceOf(src, PUBLIC)).toBeNull();
  });
});
