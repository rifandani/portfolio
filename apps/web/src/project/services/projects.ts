import "server-only";
import fs from "node:fs";
import path from "node:path";

import { cache } from "react";

import { collectProjects } from "@/project/utils/project-collection";

/**
 * Project Sources live beside the code, not in `public/`. `next.config.ts`
 * adds this folder to the output file trace, because pages render per request
 * and read it at runtime.
 */
// fallow-ignore-next-line security-sink -- both components are literals rooted at process.cwd(), not request input
const CONTENT_DIR = path.join(process.cwd(), "src/project/content");

const readProjectSources = () =>
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
 * Logic Seam shell (ADR-0001): reads the disk and delegates to
 * `collectProjects`. `cache` parses each Project Source once per request.
 */
export const getProjects = cache(() => collectProjects(readProjectSources()));

export const getProject = (slug: string) =>
  getProjects().find((project) => project.slug === slug);
