import { expect, test } from "./_base";

test("does not request Vercel analytics scripts in E2E mode", async ({
  page,
}) => {
  const requests: string[] = [];
  page.on("request", (request) => {
    const { pathname } = new URL(request.url());
    if (
      pathname === "/_vercel/insights/script.js" ||
      pathname === "/_vercel/speed-insights/script.js"
    ) {
      requests.push(pathname);
    }
  });

  await page.goto("/");

  expect(requests).toEqual([]);
  await expect(
    page.locator(
      'script[src*="/_vercel/insights/script.js"], script[src*="/_vercel/speed-insights/script.js"]'
    )
  ).toHaveCount(0);
});
