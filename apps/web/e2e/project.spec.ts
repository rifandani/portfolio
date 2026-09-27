import { expect, test } from "./_base";
import { expectLinkPreview } from "./_link-preview";

const SLUG = "hanepyon-layover-planner";

test("opens a Project Detail from the projects index", async ({ page }) => {
  await page.goto("/projects");
  const card = page.getByRole("link", { name: /Hanepyon Layover Planner/u });

  await card.click();

  await expect(page).toHaveURL(/\/projects\/hanepyon-layover-planner$/u);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Hanepyon Layover Planner"
  );
  await expect(
    page.getByRole("heading", { level: 2, name: "The brief" })
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
    /React$/u,
    /TypeScript$/u,
    /Framer Motion$/u,
    /Mantine$/u,
    /Tailwind$/u,
    /Firebase$/u,
  ]);
  await expect(page.locator("article header time")).toHaveCount(0);
});

test("gives the Project Detail its own Link Preview and JSON-LD", async ({
  page,
  request,
}) => {
  await page.goto(`/projects/${SLUG}`);

  await expectLinkPreview(page, request, {
    path: `/projects/${SLUG}`,
    card: `project=${SLUG}`,
    type: "CreativeWork",
  });
});

test("serves the Project Markdown at the Project Detail URL plus .md", async ({
  request,
}) => {
  const response = await request.get(`/projects/${SLUG}.md`);

  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toBe(
    "text/markdown; charset=utf-8"
  );
  expect(await response.text()).toMatch(/^# Hanepyon Layover Planner\n/u);
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
  await expect(links.nth(1)).toHaveText("Hanepyon Layover Planner");
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

test("shows only the GitHub link, in a new tab, for a Project without a demo", async ({
  page,
}) => {
  await page.goto(`/projects/${SLUG}`);
  const buttons = page
    .locator("article header")
    .getByRole("list", { name: /^(?:Project links|Tautan proyek)$/u })
    .getByRole("link");

  await expect(buttons).toHaveCount(1);
  await expect(buttons).toHaveAccessibleName(/View source|Lihat kode sumber/u);
  await expect(buttons).toHaveAttribute(
    "href",
    "https://github.com/rifandani/hackathon-2023"
  );
  await expect(buttons).toHaveAttribute("target", "_blank");
  await expect(buttons).toHaveAttribute("rel", "noopener noreferrer");
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
