import {
  createRequestSizeEnricher,
  createUserAgentEnricher,
} from "evlog/enrichers";
import { createEvlog } from "evlog/next";
import { createInstrumentation } from "evlog/next/instrumentation/create";

import { SERVICE_NAME } from "@/core/constants/global";
import "server-only";
// 1. Enrichers - add derived context to every event
const enrichers = [createUserAgentEnricher(), createRequestSizeEnricher()];
// Without a drain, evlog writes structured events to the console by default.
export const { withEvlog, useLogger, createError, log } = createEvlog({
  service: SERVICE_NAME,
  // 2. Enrich every event with user agent, request size, and deployment info
  enrich: (ctx) => {
    for (const enricher of enrichers) {
      enricher(ctx);
    }
    ctx.event.deploymentId = process.env.VERCEL_DEPLOYMENT_ID;
    ctx.event.region = process.env.VERCEL_REGION;
  },
});
// ------------------------------------------------------------
// Instrumentation
// ------------------------------------------------------------
export const { register: evlogRegister, onRequestError: evlogOnRequestError } =
  createInstrumentation({
    captureOutput: true,
    service: SERVICE_NAME,
  });
export const register = evlogRegister;
export const onRequestError = evlogOnRequestError;
