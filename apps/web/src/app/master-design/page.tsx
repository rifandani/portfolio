import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { MasterDesignGate } from "@/app/master-design/gate.client";
import { createMetadata } from "@/core/utils/seo";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("catalogTitle"),
    description: t("catalogDescription"),
    path: "/master-design",
    robots: {
      index: false,
      follow: false,
    },
  });
};

const MasterDesignRoutePage = () => <MasterDesignGate />;

export default MasterDesignRoutePage;
