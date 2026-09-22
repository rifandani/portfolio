import { getTranslations } from "next-intl/server";

import { SiteContainer } from "@/core/components/site-container";
import { Text } from "@/core/components/ui/text";
import { portfolioIdentity } from "@/portfolio/constants/portfolio";

/**
 * Public footer. The build credit is text only — third-party logos need asset
 * files and carry trademark rules, and the sentence says the same thing.
 */
export const SiteFooter = async () => {
  const t = await getTranslations();
  return (
    <footer className="border-border mt-24 border-t">
      <SiteContainer className="flex flex-col gap-2 py-10 sm:flex-row sm:items-center sm:justify-between">
        <Text className="font-mono text-xs/5 text-pretty sm:text-sm/6">
          {portfolioIdentity.copyright}
        </Text>
        <Text className="text-muted-fg font-mono text-xs/5 text-pretty sm:text-sm/6">
          {t("siteFooterBuiltWith")}
        </Text>
      </SiteContainer>
    </footer>
  );
};
