import { getTranslations } from "next-intl/server";
import { headers } from "next/headers";

import { auth } from "@/auth/utils/auth";
import { StatusScreen } from "@/core/components/status-screen";
import { Link } from "@/core/components/ui";

export default async function NotFound() {
  const t = await getTranslations();
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <StatusScreen
      code="404"
      title={t("notFound")}
      description={t("gone")}
      action={
        <Link
          href={session === null ? "/login" : "/"}
          className="flex items-center"
        >
          {t("backTo", {
            target: session === null ? "Login" : t("title"),
          })}
        </Link>
      }
    />
  );
}
