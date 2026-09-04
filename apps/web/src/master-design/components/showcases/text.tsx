import { useTranslations } from "next-intl";

import { Code, Strong, Text, TextLink } from "@/core/components/ui/text";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TextShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="Text">
        <Text>{t("catalogShowcaseMutedBody")}</Text>
      </Variant>
      <Variant label="Strong">
        <Text>
          <Strong>{t("catalogShowcaseEmphasized")}</Strong>
          {t("catalogShowcasePhrase")}
        </Text>
      </Variant>
      <Variant label="Code">
        <Text>
          {t("catalogShowcaseRun")}
          <Code>pnpm dev</Code>
          {t("catalogShowcasePeriod")}
        </Text>
      </Variant>
      <Variant label="TextLink">
        <Text>
          {t("catalogShowcaseSeeThe")}
          <TextLink href="https://example.com">
            {t("catalogShowcaseDocsLink")}
          </TextLink>
          {t("catalogShowcasePeriod")}
        </Text>
      </Variant>
    </VariantGrid>
  );
};
