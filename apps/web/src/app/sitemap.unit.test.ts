import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import sitemap, { collectPageRoutes } from "./sitemap";

vi.mock("@/post/services/posts", () => ({
  getPosts: () => [{ slug: "clarity-over-complexity" }],
}));

describe("collectPageRoutes", () => {
  let tmp: string;

  afterEach(() => {
    fs.rmSync(tmp, { force: true, recursive: true });
  });

  it("collects pages and skips private, group, and api dirs", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-"));
    fs.writeFileSync(path.join(tmp, "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "about"));
    fs.writeFileSync(path.join(tmp, "about", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "_private"));
    fs.writeFileSync(path.join(tmp, "_private", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "(group)"));
    fs.writeFileSync(path.join(tmp, "(group)", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "api"));
    fs.writeFileSync(path.join(tmp, "api", "page.tsx"), "");

    expect(collectPageRoutes(tmp).toSorted()).toEqual(["/", "/about"]);
  });

  it("keeps nested routes under a directory that has no page of its own", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-"));
    fs.mkdirSync(path.join(tmp, "docs", "intro"), { recursive: true });
    fs.writeFileSync(path.join(tmp, "docs", "intro", "page.tsx"), "");

    // `/docs` itself is pageless, so only the leaf route is emitted.
    expect(collectPageRoutes(tmp)).toEqual(["/docs/intro"]);
  });

  it("skips dynamic segments, which have no URL of their own", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-"));
    fs.mkdirSync(path.join(tmp, "posts", "[slug]"), { recursive: true });
    fs.writeFileSync(path.join(tmp, "posts", "page.tsx"), "");
    fs.writeFileSync(path.join(tmp, "posts", "[slug]", "page.tsx"), "");

    expect(collectPageRoutes(tmp)).toEqual(["/posts"]);
  });

  it("ignores non-page files", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "sitemap-"));
    fs.writeFileSync(path.join(tmp, "layout.tsx"), "");
    fs.writeFileSync(path.join(tmp, "page.ts"), "");

    expect(collectPageRoutes(tmp)).toEqual(["/"]);
  });
});

// SAFETY: `collectPageRoutes` reads only `name` and `isDirectory()` off a Dirent,
// so the stub implements exactly the surface under test.
const dirent = (name: string, isDirectory = false) =>
  ({ name, isDirectory: () => isDirectory }) as fs.Dirent;

describe("sitemap", () => {
  it("maps collected routes and each Post Detail to absolute URLs", () => {
    // the app dir is resolved from `process.cwd()` at import time, so stub the
    // reads instead of depending on the real tree
    // SAFETY: `readdirSync` is heavily overloaded; the cast selects the string-path
    // overload this test drives.
    vi.spyOn(fs, "readdirSync").mockImplementation(((dir: string) =>
      dir.endsWith("about")
        ? [dirent("page.tsx")]
        : [dirent("page.tsx"), dirent("about", true)]) as never);

    expect(sitemap()).toEqual([
      {
        lastModified: expect.any(Date),
        url: "https://web.portfolio.localhost/",
      },
      {
        lastModified: expect.any(Date),
        url: "https://web.portfolio.localhost/about",
      },
      {
        lastModified: expect.any(Date),
        url: "https://web.portfolio.localhost/posts/clarity-over-complexity",
      },
    ]);
  });
});
