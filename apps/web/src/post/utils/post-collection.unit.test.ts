import { describe, expect, it } from "vitest";

import { adjacentPosts, collectPosts, postsByYear } from "./post-collection";

const file = (path: string, slug: string, publishedAt: string) => ({
  path,
  text: `---
slug: ${slug}
title: ${slug}
summary: About ${slug}.
publishedAt: ${publishedAt}
ogImageSrc: /og.svg
ogImageAlt: OG art
---

Text.
`,
});

describe("collectPosts", () => {
  it("orders Posts from the most recent to the oldest", () => {
    const posts = collectPosts([
      file("b.md", "middle", "2024-03-03"),
      file("a.md", "oldest", "2023-11-07"),
      file("c.md", "newest", "2024-05-12"),
    ]);

    expect(posts.map((post) => post.slug)).toEqual([
      "newest",
      "middle",
      "oldest",
    ]);
  });

  it("rejects two Post Sources with the same Slug, naming both files", () => {
    expect(() =>
      collectPosts([
        file("first.md", "same-slug", "2024-01-01"),
        file("second.md", "same-slug", "2024-02-02"),
      ])
    ).toThrow(/same-slug[\s\S]*first\.md[\s\S]*second\.md/u);
  });
});

describe("adjacentPosts", () => {
  const posts = [{ slug: "newest" }, { slug: "middle" }, { slug: "oldest" }];

  it("links the Post published before as previous and after as next", () => {
    expect(adjacentPosts(posts, "middle")).toEqual({
      previous: { slug: "oldest" },
      next: { slug: "newest" },
    });
  });

  it("has no next Post for the most recent Post", () => {
    expect(adjacentPosts(posts, "newest")).toEqual({
      previous: { slug: "middle" },
      next: undefined,
    });
  });

  it("has no previous Post for the oldest Post", () => {
    expect(adjacentPosts(posts, "oldest")).toEqual({
      previous: undefined,
      next: { slug: "middle" },
    });
  });

  it("has no neighbours for an unknown Slug", () => {
    expect(adjacentPosts(posts, "missing")).toEqual({});
  });
});

describe("postsByYear", () => {
  it("files Posts under their publish year, newest year first, in order", () => {
    const posts = [
      { slug: "may", publishedAt: "2024-05-12" },
      { slug: "march", publishedAt: "2024-03-03" },
      { slug: "november", publishedAt: "2023-11-07" },
    ];

    expect(postsByYear(posts)).toEqual([
      { year: "2024", posts: [posts[0], posts[1]] },
      { year: "2023", posts: [posts[2]] },
    ]);
  });

  it("keeps a Post published on 1 January in its own year", () => {
    expect(postsByYear([{ publishedAt: "2025-01-01" }])).toEqual([
      { year: "2025", posts: [{ publishedAt: "2025-01-01" }] },
    ]);
  });

  it("has no years when there are no Posts", () => {
    expect(postsByYear([])).toEqual([]);
  });
});
