import {
  HomeDirectionContract,
  HomePageContent,
} from "@/core/components/home/home-sections";
import { SiteShell } from "@/core/components/site-shell";
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
  url:
    process.env.NODE_ENV === "production"
      ? "https://web.com"
      : "https://web.portfolio.localhost",
  title,
  description,
};

export const metadata = createMetadata({
  title,
  description,
});

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
