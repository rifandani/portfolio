"use client";

import { NotFoundScreen } from "@/app/_components/not-found-screen";
import { MasterDesignPage } from "@/features/master-design/components/catalog-page";
import { useFeatureEnabled } from "@/lib/feature-flags/use-feature-enabled";

/**
 * Client gate for the Master Design: wait for Feature Flag rehydration,
 * then show the recoverable 404 screen when `componentCatalog` is off.
 *
 * Uses `NotFoundScreen` instead of Next.js `notFound()` — `notFound()` replaces
 * the segment and cannot recover via `router.refresh()` when the flag turns ON.
 */
export const MasterDesignGate = () => {
  const enabled = useFeatureEnabled("componentCatalog");

  if (enabled === undefined) {
    return null;
  }

  if (!enabled) {
    return <NotFoundScreen />;
  }

  return <MasterDesignPage />;
};
