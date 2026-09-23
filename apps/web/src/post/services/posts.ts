import "server-only";
import fs from "node:fs";
import path from "node:path";

import { cache } from "react";

import { collectPosts } from "@/post/utils/post-collection";

/**
 * Post Sources live beside the code, not in `public/`. `next.config.ts` adds
 * this folder to the output file trace, because pages render per request and
 * read it at runtime.
 */
// fallow-ignore-next-line security-sink -- both components are literals rooted at process.cwd(), not request input
const CONTENT_DIR = path.join(process.cwd(), "src/post/content");

const readPostSources = () =>
  fs.readdirSync(CONTENT_DIR).flatMap((name) =>
    name.endsWith(".md")
      ? [
          {
            path: name,
            // fallow-ignore-next-line security-sink -- name is a readdir entry of CONTENT_DIR, not request input
            text: fs.readFileSync(path.join(CONTENT_DIR, name), "utf-8"),
          },
        ]
      : []
  );

/**
 * Logic Seam shell (ADR-0001): reads the disk and delegates to `collectPosts`.
 * `cache` parses each Post Source once per request.
 */
export const getPosts = cache(() => collectPosts(readPostSources()));

export const getPost = (slug: string) =>
  getPosts().find((post) => post.slug === slug);
