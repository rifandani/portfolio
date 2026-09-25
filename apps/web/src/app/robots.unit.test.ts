import { describe, expect, it, vi } from "vitest";

import robots from "./robots";

vi.mock("@/core/constants/env", () => ({
  ENV: { NEXT_PUBLIC_APP_URL: "https://web.portfolio.localhost" },
}));

describe("robots", () => {
  it("points the sitemap at the app URL", () => {
    expect(robots().sitemap).toBe(
      "https://web.portfolio.localhost/sitemap.xml"
    );
  });

  it("allows every user agent at the root", () => {
    expect(robots().rules).toEqual({ allow: "/", userAgent: "*" });
  });
});
