import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import {
  HomeDirectionContract,
  HomePageContent,
} from "@/core/components/home/home-sections";
import { SiteShell } from "@/core/components/site-shell";
import {
  createMetadata,
  createPerson,
  createWebPage,
  createWebSite,
  JsonLd,
} from "@/core/utils/seo";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

const title = "Home";
const description = portfolioIdentity.siteDescription;

/** The card leads with the hero headline: "Home" says nothing in a feed. */
export const generateMetadata = async (): Promise<Metadata> => {
  const t = await getTranslations();
  return createMetadata({
    title,
    description,
    path: "/",
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
      <JsonLd
        graphs={[
          createWebSite(),
          createPerson(),
          createWebPage({ path: "/", title, description }),
        ]}
      />
    </>
  );
}
