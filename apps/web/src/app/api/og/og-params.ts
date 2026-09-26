import type { NextRequest } from "next/server";

export const parseOgRequest = (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  return {
    isLight: req.headers.get("Sec-CH-Prefers-Color-Scheme") === "light",
    title: searchParams.has("title")
      ? searchParams.get("title")
      : "Tri Rizeki Rifandani",
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
