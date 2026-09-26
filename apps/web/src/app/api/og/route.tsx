import { readFile } from "node:fs/promises";
import path from "node:path";

import { getLocale, getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import type { ReactElement } from "react";

import { createError, useLogger, withEvlog } from "@/core/utils/evlog";
import { traceStill } from "@/portfolio/utils/glyph-engine";
import { getPost } from "@/post/services/posts";
import { rulerOf, stampOf } from "@/post/utils/postmark";
import { postPath } from "@/post/utils/slug";
import { getProjects } from "@/project/services/projects";
import { projectPath } from "@/project/utils/project-path";

import {
  OgPageCard,
  OgPostCard,
  OgProjectCard,
  STILL_CELL,
  STILL_COLS,
  STILL_POSE,
  STILL_ROWS,
} from "./og-card";
import type { OgCard } from "./og-params";
import {
  OG_DEFAULT_TITLE,
  OG_SIZE,
  parseOgRequest,
  rethrowNonError,
} from "./og-params";
import { previewSourceOf } from "./og-sources";

/**
 * The three faces of the site as static files: Satori cannot use
 * `next/font`, and it reads TTF, not WOFF2. `next.config.ts` adds the folder
 * to the output file trace, because the route reads it at runtime.
 */
// fallow-ignore-next-line security-sink -- both components are literals rooted at process.cwd(), not request input
const FONT_DIR = path.join(process.cwd(), "src/app/api/og/fonts");
const FONTS = [
  { file: "Roboto-SemiBold.ttf", name: "Roboto", weight: 600 },
  { file: "Quicksand-Medium.ttf", name: "Quicksand", weight: 500 },
  { file: "IBMPlexMono-Medium.ttf", name: "IBM Plex Mono", weight: 500 },
] as const;

const readFonts = () =>
  Promise.all(
    FONTS.map(async ({ file, name, weight }) => ({
      // fallow-ignore-next-line security-sink -- file is a literal of FONTS, not request input
      data: await readFile(path.join(FONT_DIR, file)),
      name,
      style: "normal" as const,
      weight,
    }))
  );

let loadedFonts: Awaited<ReturnType<typeof readFonts>> | null = null;

/** Read the faces once per server; a failed read throws and is retried next request. */
const loadFonts = async () => {
  loadedFonts ??= await readFonts();
  return loadedFonts;
};

// fallow-ignore-next-line security-sink -- both components are literals rooted at process.cwd(), not request input
const PUBLIC_DIR = path.join(process.cwd(), "public");

/** A Project preview as a source Satori can load: inlined, or a URL. */
const drawingOf = async (src: string): Promise<string | null> => {
  const source = previewSourceOf(src, PUBLIC_DIR);
  if (source === null) {
    return null;
  }
  if (source.kind === "remote") {
    return source.url;
  }
  try {
    const data = await readFile(source.file);
    return `data:${source.type};base64,${data.toString("base64")}`;
  } catch {
    return null;
  }
};

const sheetNumberOf = (value: number) => String(value).padStart(2, "0");

const pageCard = (title: string, description?: string) => (
  <OgPageCard
    description={description}
    still={traceStill(
      STILL_COLS,
      STILL_ROWS,
      STILL_CELL.w,
      STILL_CELL.h,
      STILL_POSE
    )}
    title={title}
  />
);

const postCard = async (slug: string) => {
  const post = getPost(slug);
  if (!post) {
    return null;
  }
  const [t, locale] = await Promise.all([getTranslations(), getLocale()]);
  return (
    <OgPostCard
      path={postPath(post.slug)}
      readingTime={t("postReadingTime", { minutes: post.readingMinutes })}
      ruler={rulerOf(post.readingMinutes)}
      stamp={stampOf(post.publishedAt, locale)}
      summary={post.summary}
      title={post.title}
    />
  );
};

const projectCard = async (slug: string) => {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  const project = projects[index];
  if (!project) {
    return null;
  }
  const [t, drawing] = await Promise.all([
    getTranslations(),
    drawingOf(project.previewSrc),
  ]);
  return (
    <OgProjectCard
      description={project.description}
      drawing={drawing}
      path={projectPath(project.slug)}
      sheet={{
        number: sheetNumberOf(index + 1),
        total: sheetNumberOf(projects.length),
      }}
      sheetLabel={t("projectCardSheet")}
      title={project.title}
    />
  );
};

/** The card for a request. A slug the store does not know gets the site card. */
const cardFor = async (card: OgCard): Promise<ReactElement> => {
  if (card.kind === "page") {
    return pageCard(card.title, card.description);
  }
  const found =
    card.kind === "post"
      ? await postCard(card.slug)
      : await projectCard(card.slug);
  return found ?? pageCard(OG_DEFAULT_TITLE);
};

export const GET = withEvlog(async (req: NextRequest) => {
  const log = useLogger();
  try {
    const card = parseOgRequest(req);
    log.set({ og: card });
    const [element, fonts] = await Promise.all([cardFor(card), loadFonts()]);
    return new ImageResponse(element, { ...OG_SIZE, fonts });
  } catch (error) {
    rethrowNonError(error);
    throw createError({
      fix: "Please try again later",
      message: "Failed to generate the image",
      status: 500,
      why: "Failed to generate the image",
    });
  }
});
