import { expect, test } from "./_base";

test("media arrows navigate without closing the preview", async ({ page }) => {
  await page.goto("/gallery#hackathon-2023");

  const dialog = page.getByRole("dialog");
  // A press before hydration does nothing, so press until the preview opens.
  await expect(async () => {
    await page.getByRole("button", { name: "View Team discussion" }).click();
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();
  await expect(dialog.getByText("1 of 14")).toBeVisible();

  const previous = dialog.getByRole("button", { name: "Previous media" });
  const next = dialog.getByRole("button", { name: "Next media" });
  await expect(previous).toBeDisabled();

  await next.click();
  await expect(dialog.getByText("2 of 14")).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Another team discussion" })
  ).toBeVisible();

  await previous.click();
  await expect(dialog.getByText("1 of 14")).toBeVisible();
  await expect(
    dialog.getByRole("heading", { name: "Team discussion" })
  ).toBeVisible();

  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("2 of 14")).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("1 of 14")).toBeVisible();
});

test("arrow keys navigate as soon as the preview opens", async ({ page }) => {
  await page.goto("/gallery#hackathon-2023");

  const dialog = page.getByRole("dialog");
  await expect(async () => {
    await page.getByRole("button", { name: "View Team discussion" }).click();
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();

  await page.keyboard.press("ArrowRight");
  await expect(dialog.getByText("2 of 14")).toBeVisible();
  await page.keyboard.press("ArrowLeft");
  await expect(dialog.getByText("1 of 14")).toBeVisible();
});

test("next arrow stops at the last media", async ({ page }) => {
  await page.goto("/gallery#hackathon-2023");

  const dialog = page.getByRole("dialog");
  await expect(async () => {
    await page.getByRole("button", { name: /^View .*Kamata/u }).click();
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();

  await expect(dialog.getByText("14 of 14")).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Next media" })
  ).toBeDisabled();
});

test("video does not show the previous photo", async ({ page }) => {
  await page.goto("/gallery#hackathon-2023");

  const dialog = page.getByRole("dialog");
  await expect(async () => {
    await page.getByRole("button", { name: "View Presentation" }).click();
    await expect(dialog).toBeVisible({ timeout: 1000 });
  }).toPass();
  await expect(dialog.getByText("7 of 14")).toBeVisible();
  await expect(
    dialog.getByRole("img", { name: "Presentation" })
  ).toHaveAttribute("src", /presentation\./u);

  await dialog.getByRole("button", { name: "Next media" }).click();
  await expect(dialog.getByText("8 of 14")).toBeVisible();

  const video = dialog.locator("video");
  await expect(video).toBeVisible();
  // Before play, the video shows its poster. It must not be photo 7.
  const poster = (await video.getAttribute("poster")) ?? "";
  expect(decodeURIComponent(poster)).not.toMatch(/presentation\./u);
});
