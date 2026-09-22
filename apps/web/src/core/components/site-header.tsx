import { twMerge } from "tailwind-merge";

import { LanguageToggle } from "@/core/components/language-toggle.client";
import { SiteContainer } from "@/core/components/site-container";
import { navLinkClass, SiteNav } from "@/core/components/site-nav.client";
import { ThemeToggle } from "@/core/components/theme-toggle.client";
import { Link } from "@/core/components/ui/link";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/**
 * Public topbar. The wordmark is the home link — the site has no logo asset,
 * and a text mark carries the same signal without inventing branding.
 */
export const SiteHeader = () => (
  <header className="border-border bg-navbar/90 sticky top-0 z-20 border-b backdrop-blur-md">
    <SiteContainer className="relative flex h-14 items-center justify-between gap-2">
      <Link
        className={twMerge(
          navLinkClass,
          "text-fg font-display font-semibold tracking-tight sm:text-base/6"
        )}
        href="/"
      >
        {portfolioIdentity.shortName}
      </Link>

      <SiteNav />

      <div className="flex items-center gap-x-1">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </SiteContainer>
  </header>
);
