import fs from "node:fs";
import os from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it, vi } from "vitest";

import { collectPageRoutes } from "./page-routes";

describe("collectPageRoutes", () => {
  let tmp: string;

  afterEach(() => {
    fs.rmSync(tmp, { force: true, recursive: true });
  });

  it("collects pages and skips private, group, and skipped dirs", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "page-routes-"));
    fs.writeFileSync(path.join(tmp, "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "about"));
    fs.writeFileSync(path.join(tmp, "about", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "_private"));
    fs.writeFileSync(path.join(tmp, "_private", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "(group)"));
    fs.writeFileSync(path.join(tmp, "(group)", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "api"));
    fs.writeFileSync(path.join(tmp, "api", "page.tsx"), "");
    fs.mkdirSync(path.join(tmp, "master-design"));
    fs.writeFileSync(path.join(tmp, "master-design", "page.tsx"), "");

    expect(collectPageRoutes(tmp).toSorted()).toEqual(["/", "/about"]);
  });

  it("keeps nested routes under a directory that has no page of its own", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "page-routes-"));
    fs.mkdirSync(path.join(tmp, "docs", "intro"), { recursive: true });
    fs.writeFileSync(path.join(tmp, "docs", "intro", "page.tsx"), "");

    // `/docs` itself is pageless, so only the leaf route is emitted.
    expect(collectPageRoutes(tmp)).toEqual(["/docs/intro"]);
  });

  it("skips dynamic segments, which have no URL of their own", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "page-routes-"));
    fs.mkdirSync(path.join(tmp, "posts", "[slug]"), { recursive: true });
    fs.writeFileSync(path.join(tmp, "posts", "page.tsx"), "");
    fs.writeFileSync(path.join(tmp, "posts", "[slug]", "page.tsx"), "");

    expect(collectPageRoutes(tmp)).toEqual(["/posts"]);
  });

  it("ignores non-page files", () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "page-routes-"));
    fs.writeFileSync(path.join(tmp, "layout.tsx"), "");
    fs.writeFileSync(path.join(tmp, "page.ts"), "");

    expect(collectPageRoutes(tmp)).toEqual(["/"]);
  });
});

describe("pageRoutes", () => {
  let tmp: string;

  afterEach(() => {
    vi.restoreAllMocks();
    vi.resetModules();
    fs.rmSync(tmp, { force: true, recursive: true });
  });

  it("reads `src/app` under the working directory and sorts the routes", async () => {
    tmp = fs.mkdtempSync(path.join(os.tmpdir(), "page-routes-"));
    const app = path.join(tmp, "src", "app");
    for (const dir of ["", "posts", "about"]) {
      fs.mkdirSync(path.join(app, dir), { recursive: true });
      fs.writeFileSync(path.join(app, dir, "page.tsx"), "");
    }
    vi.spyOn(process, "cwd").mockReturnValue(tmp);
    vi.resetModules();

    const { pageRoutes } = await import("./page-routes");

    expect(pageRoutes()).toEqual(["/", "/about", "/posts"]);
  });
});
