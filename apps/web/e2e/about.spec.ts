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
  await expect(
    page.getByRole("term", { name: /^(?:Based in|Domisili)$/u })
  ).toBeVisible();

  await flip.press("ArrowLeft");
  await expect(flip).toHaveAttribute("aria-pressed", "false");
  await expect(
    page.getByRole("img", { name: "Portrait of Tri Rizeki Rifandani" })
  ).toBeVisible();
});

test("should open the CV in a new tab", async ({ page }) => {
  const cv = page.getByRole("link", { name: /View CV/u });
  await expect(cv).toHaveAttribute("target", "_blank");
  await expect(cv).toHaveAttribute("rel", "noopener noreferrer");

  const popupPromise = page.waitForEvent("popup");
  await cv.click();
  const cvPage = await popupPromise;

  await expect(
    cvPage.getByRole("heading", {
      level: 1,
      name: "Tri Rizeki Rifandani",
    })
  ).toBeVisible();
  await expect(
    cvPage.getByRole("heading", { level: 2, name: /Work experience/u })
  ).toBeVisible();
});
