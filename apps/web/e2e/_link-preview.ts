import type { APIRequestContext, Page } from "@playwright/test";

import { expect } from "./_base";

const content = (page: Page, selector: string) =>
  page.locator(selector).getAttribute("content");

/**
 * Check the head tags a Link Preview and a crawler read from a detail page.
 * `APP_URL` can differ from the test server, so the addresses are checked by
 * their path; the OG Card is then loaded from the test server by that path.
 */
export const expectLinkPreview = async (
  page: Page,
  request: APIRequestContext,
  { path, card, type }: { path: string; card: string; type: string }
) => {
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  expect(new URL(canonical ?? "").pathname).toBe(path);
  expect(await content(page, 'meta[property="og:url"]')).toBe(canonical);
  await expect(page.locator('meta[property="og:type"]')).toHaveAttribute(
    "content",
    "article"
  );
  await Promise.all(
    ["twitter:site", "twitter:creator"].map((name) =>
      expect(page.locator(`meta[name="${name}"]`)).toHaveAttribute(
        "content",
        "@tri_rizeki"
      )
    )
  );
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
    "content",
    "summary_large_image"
  );
  // A Link Preview shows the site name beside the title, so the title is bare.
  const title = await content(page, 'meta[property="og:title"]');
  expect(title).not.toContain(" | ");
  expect(await content(page, 'meta[name="twitter:title"]')).toBe(title);

  const image = new URL(
    (await content(page, 'meta[property="og:image"]')) ?? ""
  );
  expect(image.origin).toBe(new URL(canonical ?? "").origin);
  expect(`${image.pathname}${image.search}`).toBe(`/api/og?${card}`);
  expect(await content(page, 'meta[name="twitter:image"]')).toBe(image.href);
  const response = await request.get(`${image.pathname}${image.search}`);
  expect(response.headers()["content-type"]).toBe("image/png");

  // SAFETY: `JsonLd` always writes one `{ "@graph": [...] }` object, and each
  // node of this app has an `@type`.
  const graph = JSON.parse(
    (await page.getByTestId("schema-org-graph").textContent()) ?? ""
  ) as { "@graph": { "@type": string }[] };
  expect(graph["@graph"].map((node) => node["@type"])).toEqual([
    "WebSite",
    "Person",
    type,
    "BreadcrumbList",
  ]);
};
