import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SiteShell } from "@/core/components/site-shell";
import { createMetadata } from "@/core/utils/seo";
import { GalleryExperience } from "@/gallery/components/gallery-experience.client";

export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title: t("galleryTitle"),
    description: t("galleryDescription"),
    path: "/gallery",
  });
};

const GalleryPage = () => (
  <SiteShell>
    <GalleryExperience />
  </SiteShell>
);

export default GalleryPage;
