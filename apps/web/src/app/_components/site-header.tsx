import { LanguageToggle } from "@/components/language-toggle.client";
import { SiteContainer } from "@/components/site-container";
import { SiteLogo } from "@/components/site-logo.client";
import { SiteNav } from "@/components/site-nav.client";
import { ThemeToggle } from "@/components/theme-toggle.client";
import { setUserLocaleAction } from "@/server/actions/i18n";

/**
 * Public topbar: the logo (the home link, see `SiteLogo`), the page links, and
 * the theme and language toggles.
 */
export const SiteHeader = () => (
  <header
    className="border-border bg-navbar/90 sticky top-0 z-20 border-b backdrop-blur-md"
    data-site-header
  >
    <SiteContainer className="relative flex min-h-14 flex-wrap items-center justify-between gap-x-2 gap-y-0 pt-2 md:h-14 md:flex-nowrap md:pt-0">
      <SiteLogo />

      <SiteNav />

      <div className="flex items-center gap-x-1">
        <ThemeToggle />
        <LanguageToggle setLocaleAction={setUserLocaleAction} />
      </div>
    </SiteContainer>
  </header>
);
