import { getTranslations } from "next-intl/server";

import { StatusScreen } from "@/core/components/status-screen";
import { Link } from "@/core/components/ui/link";

export default async function NotFound() {
  const t = await getTranslations();

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
