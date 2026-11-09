import { describe, expect, it } from "vitest";

import { postMarkdownPath, postPath } from "./slug";

describe("postPath", () => {
  it("places a Post Detail at its Slug under /posts", () => {
    expect(postPath("clarity-over-complexity")).toBe(
      "/posts/clarity-over-complexity"
    );
  });
});

describe("postMarkdownPath", () => {
  it("places the Post Markdown at the Post Detail path plus .md", () => {
    expect(postMarkdownPath("clarity-over-complexity")).toBe(
      "/posts/clarity-over-complexity.md"
    );
  });
});
