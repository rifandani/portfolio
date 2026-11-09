import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { SiteShell } from "@/app/_components/site-shell";
import { GalleryExperience } from "@/features/gallery/components/gallery-experience.client";
import { createMetadata } from "@/utils/seo";

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
