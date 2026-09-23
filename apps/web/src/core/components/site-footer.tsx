import { getTranslations } from "next-intl/server";
import { twMerge } from "tailwind-merge";

import { SpriteIcon } from "@/core/components/icon-sprite";
import { SiteContainer } from "@/core/components/site-container";
import { Text } from "@/core/components/ui/text";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/** Colophon meta: small spaced caps in the mono face, one size at every width. */
const footerMetaClass =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase sm:text-xs/5";

/**
 * Public footer, set as a colophon. The name signs in the heading face so it
 * bookends the topbar wordmark; the year and the build credit count in mono.
 */
export const SiteFooter = async () => {
  const t = await getTranslations();
  return (
    <footer className="border-border mt-24 border-t">
      <SiteContainer className="flex flex-col gap-4 py-12 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8">
        <Text className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="text-fg font-display text-base/6 font-semibold tracking-tight sm:text-sm/6">
            {portfolioIdentity.fullName}
          </span>
          <span className={footerMetaClass}>
            © <span className="tabular-nums">{portfolioIdentity.copyrightYear}</span>
            <span aria-hidden="true" className="px-2 opacity-50">
              ·
            </span>
            {t("siteFooterRights")}
          </span>
        </Text>
        <Text
          className={twMerge(footerMetaClass, "inline-flex items-center gap-2")}
        >
          {t("siteFooterBuiltWith")}
          <SpriteIcon className="size-3.5" id="icon-nextjs" />
          <span className="sr-only">Next.js</span>
        </Text>
      </SiteContainer>
    </footer>
  );
};
