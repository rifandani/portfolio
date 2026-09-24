"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import { HomeLink } from "@/core/components/home-link.client";
import { StatusScreen } from "@/core/components/status-screen";
import { Button } from "@/core/components/ui/button";

/** The error page, for `error` and `global-error`. */
export const ErrorScreen = ({
  retry,
  withChrome,
}: {
  retry: () => void;
  withChrome?: boolean;
}) => {
  const t = useTranslations();
  return (
    <>
      <title>{t("statusErrorMetaTitle")}</title>
      <StatusScreen
        title={t("statusErrorTitle")}
        description={t("statusErrorDescription")}
        withChrome={withChrome}
        actions={
          <>
            <Button
              intent="primary"
              onPress={
                // Re-fetch and re-render the segment that failed
                () => retry()
              }
            >
              <ArrowPathIcon />
              {t("statusTryAgain")}
            </Button>
            <HomeLink intent="outline" />
          </>
        }
      />
    </>
  );
};
