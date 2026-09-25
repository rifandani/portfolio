"use client";

import { useSyncExternalStore } from "react";

import { NotFoundScreen } from "@/core/components/not-found-screen";
import { resolveFeatureEnabled } from "@/core/feature-flags/is-enabled";
import { getFeatureFlagDefinition } from "@/core/feature-flags/registry";
import { useFeatureFlagStore } from "@/core/feature-flags/store";
import { MasterDesignPage } from "@/master-design/components/catalog-page";

const subscribeHydration = (onStoreChange: () => void) =>
  useFeatureFlagStore.persist.onFinishHydration(onStoreChange);

const getHydrationSnapshot = () => useFeatureFlagStore.persist.hasHydrated();

const getServerHydrationSnapshot = () => false;

/**
 * Client gate for the Component Catalog: wait for Feature Flag rehydration,
 * then show the recoverable 404 screen when `componentCatalog` is off.
 *
 * Uses `NotFoundScreen` instead of Next.js `notFound()` — `notFound()` replaces
 * the segment and cannot recover via `router.refresh()` when the flag turns ON.
 */
export const MasterDesignGate = () => {
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const catalogOverride = useFeatureFlagStore(
    (s) => s.overrides.componentCatalog
  );

  if (!hydrated) {
    return null;
  }

  const enabled = resolveFeatureEnabled({
    isDev: process.env.NODE_ENV === "development",
    override: catalogOverride,
    defaultEnabled: getFeatureFlagDefinition("componentCatalog").defaultEnabled,
  });

  if (!enabled) {
    return <NotFoundScreen />;
  }

  return <MasterDesignPage />;
};
