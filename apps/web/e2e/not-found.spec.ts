import { expect, test } from "./_base";
// Intentional unknown route returns 404 on the document request; do not fail teardown on that.
test.use({ allowExpected404: true });
test.beforeEach(async ({ page }) => {
  // not exists route
  await page.goto("/hahahahaha");
});

test("should have heading, text description, and back to home link", async ({
  page,
}) => {
  const main = page.getByRole("main");
  const title = main.getByRole("heading", { level: 1 });
  const subtitle = main.getByRole("heading", { level: 2 });
  const description = main.getByText(
    /The link may be old|Tautannya mungkin sudah lama/u
  );
  const link = main.getByRole("link", {
    name: /Go to home page|Ke halaman beranda/u,
  });
  await expect(title).toBeVisible();
  await expect(subtitle).toBeVisible();
  await expect(description).toBeVisible();
  await expect(link).toBeVisible();
  await expect(link).toHaveText(/Back to Home page|Kembali ke halaman Home/u);
});
