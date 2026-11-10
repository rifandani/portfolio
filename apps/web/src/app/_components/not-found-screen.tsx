import { useTranslations } from "next-intl";

import { StatusScreen } from "@/app/_components/status-screen";
import { HomeLink } from "@/components/home-link.client";
import { RequestedPath } from "@/components/requested-path.client";

/**
 * The 404 page. `not-found` and the Master Design gate both render it, so
 * a gated route reads the same as a route that does not exist.
 */
export const NotFoundScreen = () => {
  const t = useTranslations();
  return (
    <StatusScreen
      title={t("statusNotFoundTitle")}
      description={t("statusNotFoundDescription")}
      detail={<RequestedPath status="404" />}
      actions={<HomeLink />}
    />
  );
};
