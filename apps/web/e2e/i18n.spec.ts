import { expect, test } from "./_base";

for (const [surface, path] of [
  ["Public Site", "/"],
  ["Master Design", "/master-design"],
] as const) {
  test(`changes the Locale from the ${surface}`, async ({ page, context }) => {
    await page.goto(path);

    const menu = page.getByRole("menu");
    // A press before hydration has no effect. Wait for the menu to respond.
    await expect(async () => {
      await page.getByRole("button", { name: "English", exact: true }).click();
      await expect(menu).toBeVisible({ timeout: 1000 });
    }).toPass();

    await menu.getByText("Indonesia", { exact: true }).click();

    await expect
      .poll(async () => {
        const cookies = await context.cookies();
        return cookies.find((cookie) => cookie.name === "NEXT_LOCALE")?.value;
      })
      .toBe("id");
    await expect(
      page.getByRole("button", { name: "Indonesia", exact: true })
    ).toBeVisible();
  });
}
