import { expect, test } from "./_base";

test.beforeEach(async ({ page }) => {
  await page.goto("/about");
});

test("should show the portrait beside the headline", async ({ page }) => {
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Portrait of Tri Rizeki Rifandani" })
  ).toBeVisible();
});

test("should flip the ID card to its back and front again", async ({
  page,
}) => {
  const flip = page.getByRole("button", { name: "Flip the ID card" });
  await expect(flip).toHaveAttribute("aria-pressed", "false");

  await flip.click();
  await expect(flip).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByText("Based in")).toBeVisible();

  await flip.press("ArrowLeft");
  await expect(flip).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("img", { name: "Portrait of Tri Rizeki Rifandani" })
  ).toBeVisible();
});

test("should open the CV in a new tab", async ({ page, request }) => {
  const cv = page.getByRole("link", { name: /View CV/u });
  await expect(cv).toHaveAttribute("target", "_blank");
  await expect(cv).toHaveAttribute("rel", "noopener noreferrer");

  // Headless Chromium downloads a PDF instead of showing it, so check that
  // the link resolves to a PDF rather than what the new tab renders.
  const href = await cv.getAttribute("href");
  expect(href).not.toBeNull();
  const response = await request.get(href ?? "");
  expect(response.ok()).toBe(true);
  expect(response.headers()["content-type"]).toContain("application/pdf");
});
