import type { FetchHandlerResult } from "next/experimental/testmode/playwright.js";

export type FetchHandler = (
  request: Request
) => FetchHandlerResult | Promise<FetchHandlerResult>;
