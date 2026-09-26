"use client";

import { useSyncExternalStore } from "react";

import { resolveFeatureEnabled } from "@/core/feature-flags/is-enabled";
import type { FeatureFlagId } from "@/core/feature-flags/registry";
import { getFeatureFlagDefinition } from "@/core/feature-flags/registry";
import { useFeatureFlagStore } from "@/core/feature-flags/store";

const subscribeHydration = (onStoreChange: () => void) =>
  useFeatureFlagStore.persist.onFinishHydration(onStoreChange);

const getHydrationSnapshot = () => useFeatureFlagStore.persist.hasHydrated();

const getServerHydrationSnapshot = () => false;

/**
 * Whether a Feature Flag is on for this browser. `undefined` until the stored
 * overrides rehydrate, so the server render and the first client render agree,
 * and a caller can tell "not known yet" apart from "off".
 */
export const useFeatureEnabled = (id: FeatureFlagId): boolean | undefined => {
  const hydrated = useSyncExternalStore(
    subscribeHydration,
    getHydrationSnapshot,
    getServerHydrationSnapshot
  );
  const override = useFeatureFlagStore((s) => s.overrides[id]);

  if (!hydrated) {
    return undefined;
  }

  return resolveFeatureEnabled({
    isDev: process.env.NODE_ENV === "development",
    override,
    defaultEnabled: getFeatureFlagDefinition(id).defaultEnabled,
  });
};
