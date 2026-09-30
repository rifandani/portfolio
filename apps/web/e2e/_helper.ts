import { expect } from "@playwright/test";
import type { Page, Response } from "@playwright/test";
import type { FetchHandlerResult } from "next/experimental/testmode/playwright.js";

export type FetchHandler = (
  request: Request
) => FetchHandlerResult | Promise<FetchHandlerResult>;

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
