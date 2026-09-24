import fs from "node:fs";
import path from "node:path";

// fallow-ignore-next-line security-sink -- both components are literals rooted at process.cwd(), not request input
const APP_DIR = path.join(process.cwd(), "src/app");
/**
 * `api` serves no pages. `master-design` is the Component Catalog: it is
 * `noindex` and shows a 404 screen when its Feature Flag is off, so a sitemap
 * must not list it.
 */
const SKIP_DIRS = new Set(["api", "master-design"]);
const PAGE_FILES = new Set(["page.ts", "page.tsx"]);

/**
 * Private (`_foo`) and route-group (`(foo)`) segments never reach the URL.
 * Dynamic (`[foo]`) segments have no URL of their own; their entries are added
 * from content.
 */
const hasNoOwnUrl = (name: string) =>
  name.startsWith("_") || name.startsWith("(") || name.startsWith("[");

/** A directory contributes routes unless it is hidden or explicitly skipped. */
const isTraversable = (entry: fs.Dirent) =>
  entry.isDirectory() &&
  !(hasNoOwnUrl(entry.name) || SKIP_DIRS.has(entry.name));

/** Collect `page.ts(x)` routes under `dir`, skipping `_` / `(` / `[` segments and `SKIP_DIRS`. */
export const collectPageRoutes = (dir: string, segment = ""): string[] => {
  const nested: string[] = [];
  let hasPage = false;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (isTraversable(entry)) {
      nested.push(
        ...collectPageRoutes(
          // fallow-ignore-next-line security-sink -- entry.name is a readdir dirent: a single path segment, and isTraversable() gates on isDirectory() so symlinks are never followed
          path.join(dir, entry.name),
          `${segment}/${entry.name}`
        )
      );
      continue;
    }
    hasPage ||= PAGE_FILES.has(entry.name);
  }
  return hasPage ? [segment || "/", ...nested] : nested;
};

/**
 * The static page routes of this app, `/` first. `readdir` order is up to the
 * file system, so sort for a stable sitemap. Read `src/app` only at build
 * time: the server output does not carry it.
 */
export const pageRoutes = () => collectPageRoutes(APP_DIR).toSorted();
