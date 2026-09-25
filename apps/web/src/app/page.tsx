import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  HomeDirectionContract,
  HomePageContent,
} from "@/core/components/home/home-sections";
import { SiteShell } from "@/core/components/site-shell";
import { ENV } from "@/core/constants/env";
import {
  createMetadata,
  createWebPage,
  createWebSite,
  JsonLd,
} from "@/core/utils/seo";

const title = "Home";
const description =
  "Personal portfolio for Tri Rizeki Rifandani — work experience, projects, and writing.";
const ldParams = {
  url: ENV.NEXT_PUBLIC_APP_URL,
  title,
  description,
};

/** The card leads with the hero headline: "Home" says nothing in a feed. */
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title,
    description,
    card: { kind: "page", title: t("homeHeadline"), description },
  });
};

export default function HomePage() {
  return (
    <>
      <HomeDirectionContract />
      <SiteShell>
        <HomePageContent />
      </SiteShell>
      <JsonLd graphs={[createWebSite(ldParams), createWebPage(ldParams)]} />
    </>
  );
}
