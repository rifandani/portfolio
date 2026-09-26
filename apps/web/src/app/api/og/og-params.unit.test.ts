import type { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { parseOgRequest, rethrowNonError } from "./og-params";

// SAFETY: `parseOgRequest` reads only the url and the color-scheme hint header.
const mockReq = (url: string, colorScheme?: string): NextRequest =>
  ({
    url,
    headers: {
      get: (name: string) =>
        name === "Sec-CH-Prefers-Color-Scheme" ? (colorScheme ?? null) : null,
    },
  }) as NextRequest;

describe("parseOgRequest", () => {
  it("uses defaults", () => {
    expect(parseOgRequest(mockReq("https://web.test/api/og"))).toEqual({
      isLight: false,
      title: "Tri Rizeki Rifandani",
    });
  });

  it("reads query and color scheme", () => {
    expect(
      parseOgRequest(mockReq("https://web.test/api/og?title=Hi", "light"))
    ).toEqual({
      isLight: true,
      title: "Hi",
    });
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
