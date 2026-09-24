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
previewSrc: /preview.svg
previewAlt: Preview art
---

Text.
`,
});

describe("collectProjects", () => {
  it("orders Projects by their order, lowest first", () => {
    const projects = collectProjects([
      file("b.md", "second", 2),
      file("c.md", "third", 3),
      file("a.md", "first", 1),
    ]);

    expect(projects.map((project) => project.slug)).toEqual([
      "first",
      "second",
      "third",
    ]);
  });

  it("rejects two Project Sources with the same Slug, naming both files", () => {
    expect(() =>
      collectProjects([
        file("first.md", "same-slug", 1),
        file("second.md", "same-slug", 2),
      ])
    ).toThrow(/Slug "same-slug"[\s\S]*first\.md[\s\S]*second\.md/u);
  });

  it("rejects two Project Sources with the same order, naming both files", () => {
    expect(() =>
      collectProjects([file("a.md", "a", 1), file("b.md", "b", 1)])
    ).toThrow(/order "1"[\s\S]*a\.md[\s\S]*b\.md/u);
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
