"use client";

import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

import { HomeLink } from "@/core/components/home-link.client";
import { StatusRecord } from "@/core/components/status-record";
import { StatusScreen } from "@/core/components/status-screen";
import { Button } from "@/core/components/ui/button";

/**
 * The error page, for `error` and `global-error`. The digest is the server's
 * reference for the log line, so it is the one detail a visitor can send back.
 *
 * `status` is set only where the code is known: a root layout error is a 500,
 * but a segment error can happen in the browser after a 200.
 */
export const ErrorScreen = ({
  digest,
  status,
  retry,
  withChrome,
}: {
  digest?: string;
  status?: string;
  retry: () => void;
  withChrome?: boolean;
}) => {
  const t = useTranslations();
  const reference = digest ? t("statusErrorReference", { digest }) : undefined;
  return (
    <>
      <title>{t("statusErrorMetaTitle")}</title>
      <StatusScreen
        title={t("statusErrorTitle")}
        description={t("statusErrorDescription")}
        detail={
          status && reference ? (
            <StatusRecord status={status}>{reference}</StatusRecord>
          ) : (
            reference
          )
        }
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
