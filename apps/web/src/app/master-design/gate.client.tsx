"use client";

import { useTranslations } from "next-intl";
import { useSyncExternalStore } from "react";

import { StatusScreen } from "@/core/components/status-screen";
import { Link } from "@/core/components/ui";
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
 * then show a recoverable 404 when `componentCatalog` is off.
 *
 * Uses `StatusScreen` instead of Next.js `notFound()` — `notFound()` replaces
 * the segment and cannot recover via `router.refresh()` when the flag turns ON.
 */
export const MasterDesignGate = () => {
  const t = useTranslations();
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
    return (
      <StatusScreen
        code="404"
        title={t("notFound")}
        description={t("gone")}
        action={
          <Link href="/" className="flex items-center">
            {t("backTo", { target: t("title") })}
          </Link>
        }
      />
    );
  }

  return <MasterDesignPage />;
};
