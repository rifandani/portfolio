import { expect, test } from "./_base";

test("opens a Post Detail from the posts index", async ({ page }) => {
  await page.goto("/posts");
  const card = page.getByRole("link", {
    name: /TypeScript lessons from real builds/u,
  });

  await card.click();

  await expect(page).toHaveURL(
    /\/posts\/synthetic-typescript-lessons-from-real-builds$/u
  );
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "[Synthetic] TypeScript lessons from real builds"
  );
  await expect(
    page.getByRole("heading", { level: 2, name: "Parse at the boundary" })
  ).toBeVisible();
});

const SLUG = "synthetic-typescript-lessons-from-real-builds";

test("serves the Post Markdown at the Post Detail URL plus .md", async ({
  request,
}) => {
  const response = await request.get(`/posts/${SLUG}.md`);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe(
    "text/markdown; charset=utf-8"
  );
  expect(await response.text()).toMatch(
    /^# \[Synthetic\] TypeScript lessons from real builds\n/u
  );
});

test("lists each Post in the RSS feed", async ({ request }) => {
  const response = await request.get("/rss.xml");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe(
    "application/rss+xml; charset=utf-8"
  );
  expect(await response.text()).toContain(`/posts/${SLUG}</link>`);
});

test("links the Posts published before and after in the Post Pager", async ({
  page,
}) => {
  await page.goto("/posts/synthetic-systems-that-scale-without-noise");
  const pager = page.getByRole("navigation", {
    name: /Previous and next posts|Tulisan sebelumnya dan berikutnya/u,
  });

  await expect(pager.getByRole("link")).toHaveCount(2);
  await expect(pager.getByRole("link").first()).toHaveAttribute(
    "href",
    "/posts/synthetic-small-updates-consistent-impact"
  );
  await expect(pager.getByRole("link").last()).toHaveAttribute(
    "href",
    "/posts/synthetic-clarity-over-complexity"
  );
});

test("has no previous Post on the oldest Post", async ({ page }) => {
  await page.goto(`/posts/${SLUG}`);
  const pager = page.getByRole("navigation", {
    name: /Previous and next posts|Tulisan sebelumnya dan berikutnya/u,
  });

  await expect(pager.getByRole("link")).toHaveCount(1);
  await expect(pager.getByRole("link")).toContainText(
    /Next post|Tulisan berikutnya/u
  );
});

test("marks the section a reader jumps to in the Post Outline", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto(`/posts/${SLUG}`);
  const outline = page.getByRole("navigation", {
    name: /On this page|Di halaman ini/u,
  });

  await expect(outline.getByRole("link")).toHaveText([
    "[Synthetic] TypeScript lessons from real builds",
    "Parse at the boundary",
    "Props that serialize",
  ]);

  await outline.getByRole("link", { name: "Props that serialize" }).click();

  await expect(page).toHaveURL(/#props-that-serialize$/u);
  await expect(
    page.getByRole("heading", { level: 2, name: "Props that serialize" })
  ).toBeInViewport();
  await expect(
    outline.getByRole("link", { name: "Props that serialize" })
  ).toHaveAttribute("aria-current", "location");
});

test("hands the Post Markdown URL to each Assistant", async ({ page }) => {
  await page.goto(`/posts/${SLUG}`);

  const trigger = page.getByRole("button", {
    name: /More page actions|Aksi halaman lainnya/u,
  });
  // A press before hydration does nothing, so press until the menu opens.
  await expect(async () => {
    await trigger.click();
    await expect(page.getByRole("menu")).toBeVisible({ timeout: 1000 });
  }).toPass();

  const items = page.getByRole("menuitem");
  await expect(items).toHaveCount(5);
  await expect(items.first()).toHaveAttribute(
    "href",
    new RegExp(`/posts/${SLUG}\\.md$`, "u")
  );
  const claude = new URL((await items.nth(1).getAttribute("href")) ?? "");
  expect(claude.origin).toBe("https://claude.ai");
  expect(claude.searchParams.get("q")).toContain(`/posts/${SLUG}.md`);
  await expect(items.nth(1)).toHaveAttribute("target", "_blank");
});

test("opens a Share Intent for the Post Detail on each Social Network", async ({
  page,
}) => {
  await page.goto(`/posts/${SLUG}`);

  const trigger = page.getByRole("button", {
    name: /More share options|Opsi berbagi lainnya/u,
  });
  // A press before hydration does nothing, so press until the menu opens.
  await expect(async () => {
    await trigger.click();
    await expect(page.getByRole("menu")).toBeVisible({ timeout: 1000 });
  }).toPass();

  const items = page.getByRole("menuitem");
  await expect(items).toHaveCount(3);
  const origins = await items.evaluateAll((links) =>
    links.map((link) => new URL(link.getAttribute("href") ?? "").origin)
  );
  expect(origins).toEqual([
    "https://x.com",
    "https://www.linkedin.com",
    "https://www.threads.com",
  ]);
  const x = new URL((await items.first().getAttribute("href")) ?? "");
  expect(x.searchParams.get("url")).toMatch(new RegExp(`/posts/${SLUG}$`, "u"));
  await expect(items.first()).toHaveAttribute("target", "_blank");
});

test.describe("unknown Slug", () => {
  test.use({ allowExpected404: true });

  test("shows the not-found page", async ({ page }) => {
    const response = await page.goto("/posts/no-such-post");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link")).toHaveText(
      /Back to Home page|Kembali ke halaman Home/u
    );
  });

  test("has no Post Markdown", async ({ request }) => {
    const response = await request.get("/posts/no-such-post.md");

    expect(response.status()).toBe(404);
  });
});
