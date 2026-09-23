import { describe, expect, it } from "vitest";

import { postMarkdownPath, postPath, toSlug } from "./slug";

describe("toSlug", () => {
  it("turns a title into a URL-friendly Slug", () => {
    expect(toSlug("[Synthetic] Clarity over complexity")).toBe(
      "synthetic-clarity-over-complexity"
    );
  });

  it("drops diacritics instead of the letters that carry them", () => {
    expect(toSlug("Café à la Crème")).toBe("cafe-a-la-creme");
  });

  it("collapses runs of punctuation and trims them from both ends", () => {
    expect(toSlug("  --Next.js 16: RSC & you!--  ")).toBe("next-js-16-rsc-you");
  });

  it("leaves a valid Slug as it is", () => {
    expect(toSlug("typescript-lessons-2024")).toBe("typescript-lessons-2024");
  });
});

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
