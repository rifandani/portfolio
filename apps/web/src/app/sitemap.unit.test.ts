import { describe, expect, it, vi } from "vitest";

import sitemap from "./sitemap";

vi.mock("@/core/constants/env", () => ({
  ENV: { NEXT_PUBLIC_APP_URL: "https://web.portfolio.localhost" },
}));

vi.mock("@/app/page-routes", () => ({
  pageRoutes: () => ["/", "/about"],
}));

vi.mock("@/post/services/posts", () => ({
  getPosts: () => [
    { publishedAt: "2024-05-12", slug: "clarity-over-complexity" },
  ],
}));

describe("sitemap", () => {
  it("maps page routes and each Post Detail to absolute URLs", () => {
    expect(sitemap()).toEqual([
      { url: "https://web.portfolio.localhost/" },
      { url: "https://web.portfolio.localhost/about" },
      {
        lastModified: "2024-05-12",
        url: "https://web.portfolio.localhost/posts/clarity-over-complexity",
      },
    ]);
  });
});
