import type { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import {
  OG_DEFAULT_TITLE,
  ogImagePath,
  parseOgRequest,
  rethrowNonError,
} from "./og-params";
import type { OgCard } from "./og-params";

// SAFETY: `parseOgRequest` reads only the url.
const mockReq = (path: string): NextRequest =>
  ({ url: `https://web.test${path}` }) as NextRequest;

describe("parseOgRequest", () => {
  it("falls back to the site card", () => {
    expect(parseOgRequest(mockReq("/api/og"))).toEqual({
      kind: "page",
      title: OG_DEFAULT_TITLE,
    });
  });

  it("treats a blank title as missing", () => {
    expect(parseOgRequest(mockReq("/api/og?title=%20%20"))).toEqual({
      kind: "page",
      title: OG_DEFAULT_TITLE,
    });
  });

  it("reads a Post or a Project by slug, before any page words", () => {
    expect(parseOgRequest(mockReq("/api/og?post=a&title=x"))).toEqual({
      kind: "post",
      slug: "a",
    });
    expect(parseOgRequest(mockReq("/api/og?project=b"))).toEqual({
      kind: "project",
      slug: "b",
    });
  });

  it("clips a title and a description that would overflow the sheet", () => {
    const card = parseOgRequest(
      mockReq(`/api/og?title=${"t".repeat(300)}&description=${"d".repeat(300)}`)
    );
    expect(card).toMatchObject({ kind: "page" });
    if (card.kind !== "page") {
      return;
    }
    expect(card.title).toHaveLength(120);
    expect(card.title.endsWith("…")).toBe(true);
    expect(card.description).toHaveLength(220);
  });
});

describe("ogImagePath", () => {
  it.each<OgCard>([
    { kind: "page", title: "Posts & notes", description: "What I learn" },
    { kind: "page", title: "Home" },
    { kind: "post", slug: "a-post" },
    { kind: "project", slug: "a-project" },
  ])("round-trips through parseOgRequest: %o", (card) => {
    expect(parseOgRequest(mockReq(ogImagePath(card)))).toEqual(card);
  });

  it("names only the slug for a Post", () => {
    expect(ogImagePath({ kind: "post", slug: "a-post" })).toBe(
      "/api/og?post=a-post"
    );
  });
});

describe("rethrowNonError", () => {
  it("passes through an Error so the caller can wrap it", () => {
    expect(() => {
      rethrowNonError(new Error("boom"));
    }).not.toThrow();
  });

  it("re-throws a non-Error value untouched", () => {
    const signal = { digest: "NEXT_REDIRECT" };
    expect(() => {
      rethrowNonError(signal);
    }).toThrow(signal);
  });
});
