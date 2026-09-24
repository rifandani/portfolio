import { useTranslations } from "next-intl";
import { twMerge } from "tailwind-merge";

import { SiteContainer } from "@/core/components/site-container";
import { Text } from "@/core/components/ui/text";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/** Colophon meta: small spaced caps in the mono face, one size at every width. */
const footerMetaClass =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase sm:text-xs/5";

/**
 * Site files keep their real, lowercase file names in mono, so they read as
 * the files they are. The rule sweeps in like the `underline` Link variant.
 */
const footerFileLinkClass = twMerge(
  "text-muted-fg hover:text-fg font-mono text-xs/5 sm:text-xs/5",
  "bg-[linear-gradient(currentColor,currentColor)] bg-[size:0%_1px] bg-[position:0_100%] bg-no-repeat",
  "transition-[background-size,color] duration-300 ease-out motion-reduce:transition-none",
  "hover:bg-[size:100%_1px] focus-visible:bg-[size:100%_1px]",
  "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-4 forced-colors:outline-[Highlight]"
);

/**
 * Plain anchors, not the React Aria Link: these are Route Handlers, not pages,
 * so the browser must load them instead of the client router.
 */
const siteFiles = [
  { href: "/llms.txt", type: "text/plain" },
  { href: "/rss.xml", type: "application/rss+xml" },
  { href: "/sitemap.xml", type: "application/xml" },
] as const;

/**
 * Public footer, set as a colophon. The name signs in the heading face so it
 * bookends the topbar wordmark; the site files and the year count in mono.
 */
export const SiteFooter = () => {
  const t = useTranslations();
  return (
    <footer className="border-border mt-24 border-t">
      <SiteContainer className="flex flex-col gap-4 py-12 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <Text className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-fg font-display text-base/6 font-semibold tracking-tight sm:text-sm/6">
            {portfolioIdentity.fullName}
          </span>
          <span className={footerMetaClass}>
            ©{" "}
            <span className="tabular-nums">
              {portfolioIdentity.copyrightYear}
            </span>
            <span aria-hidden="true" className="px-2 opacity-50">
              ·
            </span>
            {t("siteFooterRights")}
          </span>
        </Text>
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-4">
          <nav aria-label={t("siteFooterFiles")}>
            <ul className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
              {siteFiles.map(({ href, type }) => (
                <li key={href}>
                  <a className={footerFileLinkClass} href={href} type={type}>
                    {href.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </SiteContainer>
    </footer>
  );
};
