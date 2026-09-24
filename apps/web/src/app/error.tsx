"use client"; // Error boundaries must be Client Components

import { trace } from "@opentelemetry/api";
import { log } from "evlog/next/client";
import { useEffect } from "react";

import { ErrorScreen } from "@/core/components/error-screen.client";
import {
  TRACER_ROOT_ROUTE,
  TRACER_ROOT_ROUTE_ON_ERROR,
} from "@/core/constants/global";
import { errorAttributesFromUnknown } from "@/core/utils/error-helper";
import { recordException } from "@/core/utils/telemetry";

const tracer = trace.getTracer(TRACER_ROOT_ROUTE);

/**
 * designed to catch errors during rendering (not inside event handlers) to show a fallback UI instead of crashing the whole app.
 */
export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    recordException({
      tracer,
      name: TRACER_ROOT_ROUTE_ON_ERROR,
      error: {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      },
    });
    log.error({
      area: "app.error",
      phase: "render",
      summary: "Error on error page",
      ...errorAttributesFromUnknown(error),
    });
  }, [error]);

  return <ErrorScreen retry={retry} />;
}
