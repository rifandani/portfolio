import { LanguageToggle } from "@/core/components/language-toggle.client";
import { SiteContainer } from "@/core/components/site-container";
import { SiteLogo } from "@/core/components/site-logo.client";
import { SiteNav } from "@/core/components/site-nav.client";
import { ThemeToggle } from "@/core/components/theme-toggle.client";

/**
 * Public topbar: the logo (the home link, see `SiteLogo`), the page links, and
 * the theme and language toggles.
 */
export const SiteHeader = () => (
  <header className="border-border bg-navbar/90 sticky top-0 z-20 border-b backdrop-blur-md">
    <SiteContainer className="relative flex h-14 items-center justify-between gap-2">
      <SiteLogo />

      <SiteNav />

      <div className="flex items-center gap-x-1">
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </SiteContainer>
  </header>
);
