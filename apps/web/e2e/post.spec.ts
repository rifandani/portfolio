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

test.describe("unknown Slug", () => {
  test.use({ allowExpected404: true });

  test("shows the not-found page", async ({ page }) => {
    const response = await page.goto("/posts/no-such-post");

    expect(response?.status()).toBe(404);
    await expect(page.getByRole("link")).toHaveText(
      /Back to Home page|Kembali ke halaman Home/u
    );
  });
});
