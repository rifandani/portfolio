import { describe, expect, it } from "vitest";

import { adjacentProjects, collectProjects } from "./project-collection";

const file = (path: string, slug: string, order: number) => ({
  path,
  text: `---
slug: ${slug}
title: ${slug}
description: About ${slug}.
tags: [TypeScript]
order: ${order}
updatedAt: 2026-01-01
previewSrc: /preview.svg
previewAlt: Preview art
---

Text.
`,
});

const translation = (
  path: string,
  title: string,
  translatedAt = "2026-01-01",
  extra = ""
) => ({
  path,
  text: `---
title: ${title}
description: Tentang ${title}.
previewAlt: Gambar pratinjau
translatedAt: ${translatedAt}${extra}
---

## Bagian pertama

Teks dalam bahasa Indonesia.
`,
});

/** One English Project Source with its Indonesian Project Translation. */
const pair = (base: string, slug: string, order: number) => [
  file(`${base}.md`, slug, order),
  translation(`${base}.id.md`, `${slug} (id)`),
];

describe("collectProjects", () => {
  it("orders Projects by their order, lowest first", () => {
    const projects = collectProjects(
      [
        ...pair("b", "second", 2),
        ...pair("c", "third", 3),
        ...pair("a", "first", 1),
      ],
      "en"
    );

    expect(projects.map((project) => project.slug)).toEqual([
      "first",
      "second",
      "third",
    ]);
  });

  it("rejects two Project Sources with the same Slug, naming both files", () => {
    expect(() =>
      collectProjects(
        [...pair("first", "same-slug", 1), ...pair("second", "same-slug", 2)],
        "en"
      )
    ).toThrow(/Slug "same-slug"[\s\S]*first\.md[\s\S]*second\.md/u);
  });

  it("rejects two Project Sources with the same order, naming both files", () => {
    expect(() =>
      collectProjects([...pair("a", "a", 1), ...pair("b", "b", 1)], "en")
    ).toThrow(/order "1"[\s\S]*a\.md[\s\S]*b\.md/u);
  });

  it("gives the English text for the en Locale", () => {
    const [project] = collectProjects(pair("a", "hello", 1), "en");

    expect(project).toMatchObject({
      locale: "en",
      title: "hello",
      description: "About hello.",
      previewAlt: "Preview art",
    });
  });

  it("gives the Project Translation for the id Locale, with the shared metadata of the English Project Source", () => {
    const [project] = collectProjects(pair("a", "hello", 1), "id");

    expect(project).toMatchObject({
      locale: "id",
      slug: "hello",
      title: "hello (id)",
      description: "Tentang hello (id).",
      previewAlt: "Gambar pratinjau",
      tags: ["TypeScript"],
      order: 1,
      previewSrc: "/preview.svg",
    });
    expect(project?.markdown).toBe(
      "# hello (id)\n\nTentang hello (id).\n\n## Bagian pertama\n\nTeks dalam bahasa Indonesia.\n"
    );
  });

  it("rejects a Project Source with no Project Translation, whatever the Locale", () => {
    expect(() => collectProjects([file("hello.md", "hello", 1)], "en")).toThrow(
      /hello\.md has no Project Translation for Locale "id"/u
    );
  });

  it("rejects a Project Translation with no English Project Source", () => {
    expect(() =>
      collectProjects(
        [...pair("a", "a", 1), translation("ghost.id.md", "Hantu")],
        "en"
      )
    ).toThrow(/ghost\.id\.md has no English Project Source ghost\.md/u);
  });

  it("rejects a Project Translation in an unknown Locale", () => {
    expect(() =>
      collectProjects(
        [...pair("a", "a", 1), translation("a.fr.md", "Bonjour")],
        "en"
      )
    ).toThrow(/Unknown Locale "fr" in Project Translation a\.fr\.md/u);
  });

  it("rejects a Project Translation older than the English updatedAt", () => {
    expect(() =>
      collectProjects(
        [file("a.md", "a", 1), translation("a.id.md", "A", "2025-12-31")],
        "en"
      )
    ).toThrow(/Stale Project Translation a\.id\.md/u);
  });

  it("rejects a Project Translation that sets shared metadata", () => {
    expect(() =>
      collectProjects(
        [
          file("a.md", "a", 1),
          translation("a.id.md", "A", "2026-01-01", "\norder: 2"),
        ],
        "en"
      )
    ).toThrow(/a\.id\.md/u);
  });
});

describe("adjacentProjects", () => {
  const projects = [{ slug: "first" }, { slug: "middle" }, { slug: "last" }];

  it("links the Project before as previous and after as next", () => {
    expect(adjacentProjects(projects, "middle")).toEqual({
      previous: { slug: "first" },
      next: { slug: "last" },
    });
  });

  it("has no previous Project for the first Project", () => {
    expect(adjacentProjects(projects, "first")).toEqual({
      previous: undefined,
      next: { slug: "middle" },
    });
  });

  it("has no next Project for the last Project", () => {
    expect(adjacentProjects(projects, "last")).toEqual({
      previous: { slug: "middle" },
      next: undefined,
    });
  });

  it("has no neighbours for an unknown Slug", () => {
    expect(adjacentProjects(projects, "missing")).toEqual({});
  });
});
