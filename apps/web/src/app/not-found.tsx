import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { NotFoundScreen } from "@/app/_components/not-found-screen";
import { createMetadata } from "@/utils/seo";

/** Next.js adds `noindex` to every 404 response, so robots stay default. */
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("statusNotFoundMetaTitle"),
    description: t("statusNotFoundDescription"),
    path: null,
  });
};

export default function NotFound() {
  return <NotFoundScreen />;
}
