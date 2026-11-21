import { describe, expect, it } from "vitest";

import { adjacentPosts, collectPosts, postsByYear } from "./post-collection";

const file = (path: string, slug: string, publishedAt: string, extra = "") => ({
  path,
  text: `---
slug: ${slug}
title: ${slug}
summary: About ${slug}.
publishedAt: ${publishedAt}${extra}
previewSrc: /preview.svg
previewAlt: Preview art
---

Text.
`,
});

const translation = (path: string, title: string, translatedAt: string) => ({
  path,
  text: `---
title: ${title}
summary: Tentang ${title}.
previewAlt: Gambar pratinjau
translatedAt: ${translatedAt}
---

## Bagian pertama

Teks dalam bahasa Indonesia.
`,
});

/** One English Post Source with its Indonesian Post Translation. */
const pair = (base: string, slug: string, publishedAt: string) => [
  file(`${base}.md`, slug, publishedAt),
  translation(`${base}.id.md`, `${slug} (id)`, publishedAt),
];

describe("collectPosts", () => {
  it("orders Posts from the most recent to the oldest", () => {
    const posts = collectPosts(
      [
        ...pair("b", "middle", "2024-03-03"),
        ...pair("a", "oldest", "2023-11-07"),
        ...pair("c", "newest", "2024-05-12"),
      ],
      "en"
    );

    expect(posts.map((post) => post.slug)).toEqual([
      "newest",
      "middle",
      "oldest",
    ]);
  });

  it("rejects two Post Sources with the same Slug, naming both files", () => {
    expect(() =>
      collectPosts(
        [
          ...pair("first", "same-slug", "2024-01-01"),
          ...pair("second", "same-slug", "2024-02-02"),
        ],
        "en"
      )
    ).toThrow(/same-slug[\s\S]*first\.md[\s\S]*second\.md/u);
  });

  it("gives the English text for the en Locale", () => {
    const [post] = collectPosts(pair("a", "hello", "2024-01-01"), "en");

    expect(post).toMatchObject({
      locale: "en",
      title: "hello",
      summary: "About hello.",
      previewAlt: "Preview art",
    });
  });

  it("gives the Indonesian Post Translation with the shared metadata for the id Locale", () => {
    const [
      { document: _, markdown, ...post } = { document: null, markdown: "" },
    ] = collectPosts(pair("a", "hello", "2024-01-01"), "id");

    expect(post).toEqual({
      locale: "id",
      slug: "hello",
      title: "hello (id)",
      summary: "Tentang hello (id).",
      publishedAt: "2024-01-01",
      updatedAt: "2024-01-01",
      previewSrc: "/preview.svg",
      previewAlt: "Gambar pratinjau",
      readingMinutes: 1,
    });
    expect(markdown).toBe(
      "# hello (id)\n\nTentang hello (id).\n\n## Bagian pertama\n\nTeks dalam bahasa Indonesia.\n"
    );
  });

  it("rejects a Post with no Post Translation for a Locale, naming the file", () => {
    expect(() =>
      collectPosts([file("lonely.md", "lonely", "2024-01-01")], "en")
    ).toThrow(/lonely\.md[\s\S]*\bid\b/u);
  });

  it("rejects a Post Translation with no English Post Source, naming the file", () => {
    expect(() =>
      collectPosts(
        [
          ...pair("a", "hello", "2024-01-01"),
          translation("orphan.id.md", "orphan", "2024-01-01"),
        ],
        "en"
      )
    ).toThrow(/orphan\.id\.md/u);
  });

  it("rejects a Post Translation for an unknown Locale", () => {
    expect(() =>
      collectPosts(
        [
          ...pair("a", "hello", "2024-01-01"),
          translation("a.fr.md", "bonjour", "2024-01-01"),
        ],
        "en"
      )
    ).toThrow(/a\.fr\.md/u);
  });

  it("rejects a Post Translation translated before the last English update", () => {
    expect(() =>
      collectPosts(
        [
          file("a.md", "hello", "2024-01-01", "\nupdatedAt: 2024-02-01"),
          translation("a.id.md", "halo", "2024-01-31"),
        ],
        "en"
      )
    ).toThrow(/a\.id\.md[\s\S]*translatedAt/u);
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
