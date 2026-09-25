import type { NextRequest } from "next/server";

/**
 * What an OG card shows. A Post or a Project card names only its slug: the
 * route reads the rest from the store, so a shared link cannot print a date,
 * a reading time, or a stack that the Post or the Project does not have. A
 * page card carries its own words, because pages have no store.
 */
export type OgCard =
  | { kind: "page"; title: string; description?: string }
  | { kind: "post"; slug: string }
  | { kind: "project"; slug: string };

/** The card size the major feeds crop least: 1.91:1. */
export const OG_SIZE = { width: 1200, height: 630 } as const;

/** The title a page card falls back to: the site signs with the full name. */
export const OG_DEFAULT_TITLE = "Tri Rizeki Rifandani";

/**
 * Past these lengths the text would overflow the sheet. The card clamps its
 * lines too; this also keeps a hand-made URL from asking the renderer to lay
 * out a novel.
 */
const TITLE_MAX = 120;
const DESCRIPTION_MAX = 220;

const clip = (value: string, max: number) =>
  value.length > max ? `${value.slice(0, max - 1).trimEnd()}…` : value;

/** The `/api/og` URL for a card. `parseOgRequest` reads it back. */
export const ogImagePath = (card: OgCard): string => {
  const params = new URLSearchParams();
  if (card.kind === "page") {
    params.set("title", card.title);
    if (card.description) {
      params.set("description", card.description);
    }
  } else {
    params.set(card.kind, card.slug);
  }
  return `/api/og?${params.toString()}`;
};

export const parseOgRequest = (req: NextRequest): OgCard => {
  const { searchParams } = new URL(req.url);
  const post = searchParams.get("post");
  if (post) {
    return { kind: "post", slug: post };
  }
  const project = searchParams.get("project");
  if (project) {
    return { kind: "project", slug: project };
  }
  const title = searchParams.get("title")?.trim() || OG_DEFAULT_TITLE;
  const description = searchParams.get("description")?.trim();
  return {
    kind: "page",
    title: clip(title, TITLE_MAX),
    ...(description && {
      description: clip(description, DESCRIPTION_MAX),
    }),
  };
};

/**
 * Re-throw anything that is not an `Error` so framework control-flow signals
 * (redirects, `notFound()`) are not swallowed by an image-generation catch.
 */
export const rethrowNonError = <T>(error: T): void => {
  if (!(error instanceof Error)) {
    throw error;
  }
};
