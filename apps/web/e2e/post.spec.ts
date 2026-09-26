import { expect, test } from "./_base";
import { expectLinkPreview } from "./_link-preview";

test("opens a Post Detail from the posts index", async ({ page }) => {
  await page.goto("/posts");
  const card = page.getByRole("link", {
    name: /Governance is the new code review/u,
  });

  await card.click();

  await expect(page).toHaveURL(/\/posts\/governance-is-the-new-code-review$/u);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Governance is the new code review"
  );
  await expect(
    page.getByRole("heading", {
      level: 2,
      name: "The checklist that remembers",
    })
  ).toBeVisible();
});

const SLUG = "governance-is-the-new-code-review";

test("serves the Post Markdown at the Post Detail URL plus .md", async ({
  request,
}) => {
  const response = await request.get(`/posts/${SLUG}.md`);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe(
    "text/markdown; charset=utf-8"
  );
  expect(await response.text()).toMatch(
    /^# Governance is the new code review\n/u
  );
});

test("links Posts in the breadcrumb, then marks the Post current", async ({
  page,
}) => {
  await page.goto(`/posts/${SLUG}`);
  const breadcrumb = page.getByRole("navigation", {
    name: /^(?:Breadcrumb|Jalur halaman)$/u,
  });

  const links = breadcrumb.getByRole("link");
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute("href", "/posts");
  await expect(links.nth(1)).not.toHaveAttribute("href");
  await expect(links.nth(1)).toHaveAttribute("aria-current", "page");
  await expect(links.nth(1)).toHaveText("Governance is the new code review");
});

test("gives the Post Detail its own Link Preview and JSON-LD", async ({
  page,
  request,
}) => {
  await page.goto(`/posts/${SLUG}`);

  await expectLinkPreview(page, request, {
    path: `/posts/${SLUG}`,
    card: `post=${SLUG}`,
    type: "BlogPosting",
  });
});

test("lists each Post in the RSS feed", async ({ request }) => {
  const response = await request.get("/rss.xml");

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe(
    "application/rss+xml; charset=utf-8"
  );
  expect(await response.text()).toContain(`/posts/${SLUG}</link>`);
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
    "Governance is the new code review",
    "The checklist that remembers",
    "The bot that wants proof",
    "Why companies are adding these checks now",
    "What I take from it",
    "What a checkbox cannot do",
  ]);

  await outline.getByRole("link", { name: "What I take from it" }).click();

  await expect(page).toHaveURL(/#what-i-take-from-it$/u);
  await expect(
    page.getByRole("heading", { level: 2, name: "What I take from it" })
  ).toBeInViewport();
  await expect(
    outline.getByRole("link", { name: "What I take from it" })
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
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { level: 1 })).toHaveText(
      /This page does not exist\.|Halaman ini tidak ada\./u
    );
    await expect(main).toContainText("/posts/no-such-post");
    await expect(
      main.getByRole("link", { name: /Go to home page|Ke halaman beranda/u })
    ).toHaveAttribute("href", "/");
    await expect(main.getByRole("navigation").getByRole("link")).toHaveCount(3);
  });

  test("has no Post Markdown", async ({ request }) => {
    const response = await request.get("/posts/no-such-post.md");

    expect(response.status()).toBe(404);
  });
});
