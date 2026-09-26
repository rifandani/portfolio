import { BrandLogo } from "@/core/components/brand-logo";
import { LanguageToggle } from "@/core/components/language-toggle.client";
import { SiteContainer } from "@/core/components/site-container";
import { SiteNav } from "@/core/components/site-nav.client";
import { ThemeToggle } from "@/core/components/theme-toggle.client";
import { Link } from "@/core/components/ui/link";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/**
 * Public topbar. The logo is the home link; the short name is its accessible
 * name, so a screen reader still hears who the site belongs to.
 */
export const SiteHeader = () => (
  <header className="border-border bg-navbar/90 sticky top-0 z-20 border-b backdrop-blur-md">
    <SiteContainer className="relative flex h-14 items-center justify-between gap-2">
      <Link
        aria-label={portfolioIdentity.shortName}
        className="flex rounded-full outline-offset-4"
        href="/"
        variant="plain"
      >
        <BrandLogo className="size-8" />
      </Link>

      <SiteNav />

      <div className="flex items-center gap-x-1">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </SiteContainer>
  </header>
);
