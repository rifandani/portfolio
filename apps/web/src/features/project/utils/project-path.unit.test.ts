import { describe, expect, it } from "vitest";

import { projectMarkdownPath, projectPath } from "./project-path";

describe("projectPath", () => {
  it("places a Project Detail at its Slug under /projects", () => {
    expect(projectPath("signal-kit")).toBe("/projects/signal-kit");
  });
});

describe("projectMarkdownPath", () => {
  it("places the Project Markdown at the Project Detail path plus .md", () => {
    expect(projectMarkdownPath("signal-kit", "en")).toBe(
      "/projects/signal-kit.md"
    );
  });

  it("puts the Locale before .md for a non-English Project Translation", () => {
    expect(projectMarkdownPath("signal-kit", "id")).toBe(
      "/projects/signal-kit.id.md"
    );
  });
});
