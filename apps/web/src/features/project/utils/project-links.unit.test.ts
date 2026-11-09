import { describe, expect, it } from "vitest";

import { projectLinksOf, shortAddressOf } from "./project-links";

describe("shortAddressOf", () => {
  it("keeps the host and the path", () => {
    expect(shortAddressOf("https://github.com/rifandani/portfolio")).toBe(
      "github.com/rifandani/portfolio"
    );
  });

  it("drops a www, a trailing slash, the query, and the fragment", () => {
    expect(shortAddressOf("https://www.example.com/app/?ref=site#top")).toBe(
      "example.com/app"
    );
  });

  it("gives only the host for the root path", () => {
    expect(shortAddressOf("https://signal-kit.example.com/")).toBe(
      "signal-kit.example.com"
    );
  });
});

describe("projectLinksOf", () => {
  it("puts the demo before the GitHub repository", () => {
    expect(
      projectLinksOf({
        githubUrl: "https://github.com/rifandani/portfolio",
        demoUrl: "https://signal-kit.example.com",
      }).map((link) => link.kind)
    ).toEqual(["demo", "github"]);
  });

  it("gives no link for a missing URL", () => {
    expect(
      projectLinksOf({ githubUrl: "https://github.com/rifandani/portfolio" })
    ).toEqual([
      {
        kind: "github",
        href: "https://github.com/rifandani/portfolio",
        address: "github.com/rifandani/portfolio",
      },
    ]);
    expect(projectLinksOf({})).toEqual([]);
  });
});
