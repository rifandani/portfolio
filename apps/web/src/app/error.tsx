"use client"; // Error boundaries must be Client Components

import { log } from "evlog/next/client";
import { useEffect } from "react";

import { ErrorScreen } from "@/core/components/error-screen.client";
import { errorAttributesFromUnknown } from "@/core/utils/error-helper";

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
    log.error({
      area: "app.error",
      phase: "render",
      summary: "Error on error page",
      ...errorAttributesFromUnknown(error),
    });
  }, [error]);

  return <ErrorScreen retry={retry} />;
}
