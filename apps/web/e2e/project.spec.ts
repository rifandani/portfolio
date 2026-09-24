import type { Locator } from "@playwright/test";

import { expect, test } from "./_base";

const SLUG = "synthetic-signal-kit";

test("opens a Project Detail from the projects index", async ({ page }) => {
  await page.goto("/projects");
  const card = page.getByRole("link", { name: /Lattice Forms/u });

  await card.click();

  await expect(page).toHaveURL(/\/projects\/synthetic-lattice-forms$/u);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "[Synthetic] Lattice Forms"
  );
  await expect(
    page.getByRole("heading", { level: 2, name: "The approach" })
  ).toBeVisible();
});

test("shows the tags of the Project in place of a date and reading time", async ({
  page,
}) => {
  await page.goto(`/projects/${SLUG}`);
  const tags = page
    .locator("article header")
    .getByRole("list", { name: /^(?:Tags|Tag)$/u });

  // Each tag after the first starts with a hidden "·" separator.
  await expect(tags.getByRole("listitem")).toHaveText([
    /React Aria$/u,
    /Tailwind$/u,
    /TypeScript$/u,
  ]);
  await expect(page.locator("article header time")).toHaveCount(0);
});

test("serves the Project Markdown at the Project Detail URL plus .md", async ({
  request,
}) => {
  const response = await request.get(`/projects/${SLUG}.md`);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe(
    "text/markdown; charset=utf-8"
  );
  expect(await response.text()).toMatch(/^# \[Synthetic\] Signal Kit\n/u);
});

test("links Projects in the breadcrumb, then marks the Project current", async ({
  page,
}) => {
  await page.goto(`/projects/${SLUG}`);
  const breadcrumb = page.getByRole("navigation", {
    name: /^(?:Breadcrumb|Jalur halaman)$/u,
  });

  const links = breadcrumb.getByRole("link");
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute("href", "/projects");
  await expect(links.nth(1)).toHaveAttribute("aria-current", "page");
  await expect(links.nth(1)).toHaveText("[Synthetic] Signal Kit");
});

test("links the Projects before and after in the Project Pager", async ({
  page,
}) => {
  await page.goto("/projects/synthetic-portless-desk");
  const pager = page.getByRole("navigation", {
    name: /Previous and next projects|Proyek sebelumnya dan berikutnya/u,
  });

  await expect(pager.getByRole("link")).toHaveCount(2);
  await expect(pager.getByRole("link").first()).toHaveAttribute(
    "href",
    `/projects/${SLUG}`
  );
  await expect(pager.getByRole("link").last()).toHaveAttribute(
    "href",
    "/projects/synthetic-lattice-forms"
  );
});

test("has no previous Project on the first Project", async ({ page }) => {
  await page.goto(`/projects/${SLUG}`);
  const pager = page.getByRole("navigation", {
    name: /Previous and next projects|Proyek sebelumnya dan berikutnya/u,
  });

  await expect(pager.getByRole("link")).toHaveCount(1);
  await expect(pager.getByRole("link")).toContainText(
    /Next project|Proyek berikutnya/u
  );
});

test("hands the Project Markdown URL to each Assistant", async ({ page }) => {
  await page.goto(`/projects/${SLUG}`);

  const trigger = page.getByRole("button", {
    name: /More page actions|Aksi halaman lainnya/u,
  });
  // A press before hydration does nothing, so press until the menu opens.
  await expect(async () => {
    await trigger.click();
    await expect(page.getByRole("menu")).toBeVisible({ timeout: 1000 });
  }).toPass();

  const items = page.getByRole("menuitem");
  await expect(items.first()).toHaveAttribute(
    "href",
    new RegExp(`/projects/${SLUG}\\.md$`, "u")
  );
  const claude = new URL((await items.nth(1).getAttribute("href")) ?? "");
  expect(claude.searchParams.get("q")).toContain(`/projects/${SLUG}.md`);
});

/** The demo first, then GitHub; each opens a new tab. */
const expectSignalKitLinks = async (links: Locator) => {
  await expect(links).toHaveCount(2);
  await expect(links.nth(0)).toHaveAttribute(
    "href",
    "https://signal-kit.example.com"
  );
  await expect(links.nth(1)).toHaveAttribute(
    "href",
    "https://github.com/rifandani/portfolio"
  );
  await expect(links.nth(0)).toHaveAttribute("target", "_blank");
  await expect(links.nth(1)).toHaveAttribute("rel", "noopener noreferrer");
};

test("links the demo and the GitHub repository in a new tab", async ({
  page,
}) => {
  await page.goto(`/projects/${SLUG}`);
  const buttons = page
    .locator("article header")
    .getByRole("list", { name: /^(?:Project links|Tautan proyek)$/u })
    .getByRole("link");

  await expectSignalKitLinks(buttons);
});

test("shows only the GitHub link for a Project without a demo", async ({
  page,
}) => {
  await page.goto("/projects/synthetic-portless-desk");
  const buttons = page
    .locator("article header")
    .getByRole("list", { name: /^(?:Project links|Tautan proyek)$/u })
    .getByRole("link");

  await expect(buttons).toHaveCount(1);
  await expect(buttons).toHaveAccessibleName(/View source|Lihat kode sumber/u);
});

test.describe("unknown Project Slug", () => {
  test.use({ allowExpected404: true });

  test("shows the not-found page", async ({ page }) => {
    const response = await page.goto("/projects/no-such-project");

    expect(response?.status()).toBe(404);
  });

  test("has no Project Markdown", async ({ request }) => {
    const response = await request.get("/projects/no-such-project.md");

    expect(response.status()).toBe(404);
  });
});
