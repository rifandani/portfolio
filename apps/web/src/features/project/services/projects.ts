import "server-only";
import fs from "node:fs";
import path from "node:path";

import { cache } from "react";

import { collectProjects } from "@/features/project/utils/project-collection";
import type { I18NLocale } from "@/shared/constants/i18n";

/**
 * Project Sources live beside the code, not in `public/`. `next.config.ts`
 * adds this folder to the output file trace, because pages render per request
 * and read it at runtime.
 */
// fallow-ignore-next-line security-sink -- both components are literals rooted at process.cwd(), not request input
const CONTENT_DIR = path.join(process.cwd(), "src/features/project/content");

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
 * `collectProjects`. `cache` parses the Project Sources once per request and
 * Locale. The caller names the Locale: a page passes the reader's, and a feed
 * for crawlers passes the default (ADR-0004).
 */
export const getProjects = cache((locale: I18NLocale) =>
  collectProjects(readProjectSources(), locale)
);

export const getProject = (slug: string, locale: I18NLocale) =>
  getProjects(locale).find((project) => project.slug === slug);
