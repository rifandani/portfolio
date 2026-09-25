import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NotFoundScreen } from "@/core/components/not-found-screen";
import { createMetadata } from "@/core/utils/seo";

/** Next.js adds `noindex` to every 404 response, so robots stay default. */
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("statusNotFoundMetaTitle"),
    description: t("statusNotFoundDescription"),
  });
};

export default function NotFound() {
  return <NotFoundScreen />;
}
