import { expect, test } from "./_base";

const SLIDES = "https://agent-readiness-rifandani.vercel.app/";

test("opens Talks from its Home preview after Posts", async ({ page }) => {
  await page.goto("/");
  const preview = page.getByRole("region", { name: "Talks", exact: true });
  const sections = page.locator("main section");
  const labels = await sections.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute("aria-labelledby"))
  );
  expect(labels.indexOf("home-talks-heading")).toBeGreaterThan(
    labels.indexOf("home-posts-heading")
  );
  await expect(preview.getByRole("article")).toHaveCount(3);
  await expect(preview.getByRole("heading", { level: 3 }).first()).toHaveText(
    "Agent Readiness"
  );
  await preview.getByRole("link", { name: "All talks" }).click();
  await expect(page).toHaveURL(/\/talks$/u);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Talks");
});

test("shows a dated Talk and opens its slides in a new tab", async ({
  page,
}) => {
  await page.goto("/talks");
  const year = page.getByRole("region", { name: "2026", exact: true });
  const agentReadiness = year
    .getByRole("article")
    .filter({ hasText: "Agent Readiness" });
  await expect(agentReadiness.getByRole("heading", { level: 3 })).toHaveText(
    "Agent Readiness"
  );
  await expect(agentReadiness).toContainText(
    "Making websites and codebases work for AI agents"
  );
  await expect(agentReadiness.locator("time")).toHaveAttribute(
    "datetime",
    "2026-11-10"
  );
  await expect(agentReadiness.locator("time")).toHaveText("Nov 10, 2026");
  const slides = agentReadiness.getByRole("link", { name: /View slides/u });
  await expect(slides).toHaveAttribute("href", SLIDES);
  await expect(slides).toHaveAttribute("target", "_blank");
  await expect(slides).toHaveAttribute("rel", "noopener noreferrer");
  await expect(slides).toHaveAccessibleName(
    "View slides — Agent Readiness (opens in a new tab)"
  );
  await page.route(SLIDES, (route) => route.fulfill({ body: "Slides" }));
  const popupPromise = page.waitForEvent("popup");
  await slides.click();
  const popup = await popupPromise;
  await expect(popup).toHaveURL(SLIDES);
  await popup.close();

  const observability = year
    .getByRole("article")
    .filter({ hasText: "Observability (o11y)" });
  await expect(observability.getByRole("heading", { level: 3 })).toHaveText(
    "Observability (o11y)"
  );
  await expect(observability).toContainText(
    "An introduction to logs, metrics, and traces, with OpenTelemetry and the LGTM stack."
  );
  await expect(observability.locator("time")).toHaveAttribute(
    "datetime",
    "2026-06-06"
  );
  await expect(
    observability.getByRole("link", { name: /View slides/u })
  ).toHaveAttribute("href", "https://observability-rifandani.vercel.app/");

  const middleYear = page.getByRole("region", { name: "2025", exact: true });
  const featureFlags = middleYear
    .getByRole("article")
    .filter({ hasText: "Feature Flags" });
  await expect(featureFlags.getByRole("heading", { level: 3 })).toHaveText(
    "Feature Flags"
  );
  await expect(featureFlags).toContainText(
    "An introduction to feature flags, safe delivery practices, trunk-based development, and OpenFeature."
  );
  await expect(featureFlags.locator("time")).toHaveAttribute(
    "datetime",
    "2025-12-27"
  );
  await expect(featureFlags.locator("time")).toHaveText("Dec 27, 2025");
  await expect(
    featureFlags.getByRole("link", { name: /View slides/u })
  ).toHaveAttribute("href", "https://feature-flag-rifandani.vercel.app/");

  const llmTalk = middleYear
    .getByRole("article")
    .filter({ hasText: "Catching Up to Large Language Model (LLM)" });
  await expect(llmTalk.getByRole("heading", { level: 3 })).toHaveText(
    "Catching Up to Large Language Model (LLM)"
  );
  await expect(llmTalk).toContainText(
    "An overview of how LLMs work, how to evaluate them, and how to build LLM-powered applications."
  );
  await expect(llmTalk.locator("time")).toHaveAttribute(
    "datetime",
    "2025-06-10"
  );
  await expect(
    llmTalk.getByRole("link", { name: /View slides/u })
  ).toHaveAttribute("href", "https://catching-up-to-llm-rifandani.vercel.app/");

  const olderYear = page.getByRole("region", { name: "2023", exact: true });
  await expect(olderYear.getByRole("heading", { level: 3 })).toHaveText("CLI");
  await expect(olderYear).toContainText(
    "Introduction to Command Line Interface (CLI)"
  );
  await expect(olderYear.locator("time")).toHaveAttribute(
    "datetime",
    "2023-02-03"
  );
  await expect(
    olderYear.getByRole("link", { name: /View slides/u })
  ).toHaveAttribute("href", "https://cli-rifandani.vercel.app/");
});

test("translates the labels and date while keeping the Talk text", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "NEXT_LOCALE", value: "id", url: "http://localhost" },
  ]);
  await page.goto("/talks");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Presentasi"
  );
  await expect(
    page.getByRole("heading", { level: 3, name: "Agent Readiness" })
  ).toHaveText("Agent Readiness");
  await expect(
    page.getByRole("article").filter({ hasText: "Agent Readiness" })
  ).toContainText("Making websites and codebases work for AI agents");
  await expect(
    page.getByRole("heading", { level: 3, name: "CLI" })
  ).toBeVisible();
  const agentReadinessYear = page.getByRole("region", {
    name: "2026",
    exact: true,
  });
  const agentReadiness = agentReadinessYear
    .getByRole("article")
    .filter({ hasText: "Agent Readiness" });
  await expect(agentReadiness.locator("time")).toHaveText("10 Nov 2026");
  await expect(
    agentReadinessYear.getByRole("heading", {
      level: 3,
      name: "Observability (o11y)",
    })
  ).toBeVisible();
  await expect(
    agentReadinessYear.getByRole("link", { name: /Lihat slide/u })
  ).toBeVisible();
});

for (const locale of ["en", "id"] as const) {
  for (const width of [320, 640, 768]) {
    test(`keeps ${locale} navigation visible and usable at ${width}px`, async ({
      page,
      context,
    }) => {
      await context.addCookies([
        { name: "NEXT_LOCALE", value: locale, url: "http://localhost" },
      ]);
      await page.setViewportSize({ width, height: 800 });
      await page.goto("/talks");
      const nav = page.locator("header nav");
      const links = nav.getByRole("link");
      await expect(links).toHaveCount(5);
      await expect(links.nth(3)).toHaveAttribute("aria-current", "page");
      await expect(links.nth(3)).toHaveAttribute("href", "/talks");
      const boxes = await links.evaluateAll((elements) =>
        elements.map((element) => {
          const box = element.getBoundingClientRect();
          return { left: box.left, right: box.right, height: box.height };
        })
      );
      for (const box of boxes) {
        expect(box.left).toBeGreaterThanOrEqual(0);
        expect(box.right).toBeLessThanOrEqual(width);
        if (width < 768) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
      }
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth)
      ).toBe(width);
      const overlaps = await nav.evaluate((element) => {
        const navBox = element.getBoundingClientRect();
        const controls = element.nextElementSibling;
        if (!controls) {
          throw new Error("Missing header controls");
        }
        const controlsBox = controls.getBoundingClientRect();
        return (
          navBox.left < controlsBox.right &&
          navBox.right > controlsBox.left &&
          navBox.top < controlsBox.bottom &&
          navBox.bottom > controlsBox.top
        );
      });
      expect(overlaps).toBe(false);
      await links.nth(2).focus();
      await page.keyboard.press("Tab");
      await expect(links.nth(3)).toBeFocused();
    });
  }
}

test("includes Talks in metadata and site discovery", async ({
  page,
  request,
}) => {
  await page.goto("/talks");
  await expect(page).toHaveTitle(/^Talks \|/u);
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    /\/talks$/u
  );
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    "content",
    /\/api\/og\?.*title=Talks/u
  );
  const jsonLd = await page
    .locator('script[type="application/ld+json"]')
    .allTextContents();
  expect(jsonLd.join("\n")).toContain('"dateCreated":"2026-11-10"');
  await Promise.all(
    ["/sitemap.xml", "/sitemap.md", "/llms.txt"].map(async (path) => {
      const response = await request.get(path);
      expect(response.ok()).toBe(true);
      expect(await response.text()).toContain("/talks");
    })
  );
});
