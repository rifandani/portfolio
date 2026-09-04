import { getTranslations } from "next-intl/server";

import { LanguageToggle } from "@/core/components/language-toggle.client";
import { ThemeToggle } from "@/core/components/theme-toggle.client";
import {
  createMetadata,
  createWebPage,
  createWebSite,
  JsonLd,
} from "@/core/utils/seo";

const title = "Home";
const description =
  "Personal portfolio. Explore projects, writing, and contact details.";
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

export default async function HomePage() {
  const t = await getTranslations();

  return (
    <div className="container mx-auto flex flex-col items-center gap-y-2 py-24">
      <h1 className="text-3xl sm:text-4xl">{t("title")}</h1>
      <h2 className="font-mono text-xl sm:text-2xl">{t("welcome")}</h2>

      <div className="flex items-center gap-x-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      <JsonLd graphs={[createWebSite(ldParams), createWebPage(ldParams)]} />
    </div>
  );
}
