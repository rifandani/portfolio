import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { LanguageToggle } from "@/core/components/language-toggle.client";
import { SiteContainer } from "@/core/components/site-container";
import { ThemeToggle } from "@/core/components/theme-toggle.client";
import { Link } from "@/core/components/ui/link";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

const navLinkClass = twMerge(
  "text-fg rounded-lg px-2 py-2 text-sm/6 font-medium",
  "hover:bg-secondary",
  "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2"
);

/**
 * Public topbar. The wordmark is the home link — the site has no logo asset,
 * and a text mark carries the same signal without inventing branding.
 */
export const SiteHeader = async () => {
  const t = await getTranslations();
  return (
    <header className="border-border bg-navbar/90 sticky top-0 z-20 border-b backdrop-blur-md">
      <SiteContainer className="flex h-14 items-center justify-between gap-2">
        <Link
          href="/"
          className={twMerge(
            navLinkClass,
            "font-display font-semibold tracking-tight sm:text-base/6"
          )}
        >
          {portfolioIdentity.shortName}
        </Link>

        <div className="flex items-center gap-1">
          <nav
            aria-label={t("navPrimary")}
            className="flex items-center gap-0.5"
          >
            <Link href="/about" className={navLinkClass}>
              {t("siteNavAbout")}
            </Link>
            <Link href="/projects" className={navLinkClass}>
              {t("siteNavProjects")}
            </Link>
            <Link href="/posts" className={navLinkClass}>
              {t("siteNavPosts")}
            </Link>
          </nav>

          <div className="ml-1 flex items-center gap-x-1">
            <ThemeToggle />
            <LanguageToggle />
          </div>
        </div>
      </SiteContainer>
    </header>
  );
};
