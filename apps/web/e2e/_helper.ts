import { expect } from "@playwright/test";
import type { Page, Response } from "@playwright/test";

/** A streamed not-found page has HTTP 200 and a noindex tag in Next.js 16. */
export const expectNotFoundResponse = async (
  page: Page,
  response: Response | null
) => {
  if (response?.status() === 404) {
    return;
  }

  expect(response?.status()).toBe(200);
  await expect(
    page.locator('meta[name="robots"][content="noindex"]').first()
  ).toHaveAttribute("content", "noindex");
};
