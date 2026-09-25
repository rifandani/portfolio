import { useTranslations } from "next-intl";

import { HomeLink } from "@/core/components/home-link.client";
import { RequestedPath } from "@/core/components/requested-path.client";
import { StatusScreen } from "@/core/components/status-screen";

/**
 * The 404 page. `not-found` and the Component Catalog gate both render it, so
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
