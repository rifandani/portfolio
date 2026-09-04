import { useTranslations } from "next-intl";

import { Heading } from "@/core/components/ui/heading";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const HeadingShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="level 1">
        <Heading level={1}>{t("catalogShowcaseHeadingOne")}</Heading>
      </Variant>
      <Variant label="level 2">
        <Heading level={2}>{t("catalogShowcaseHeadingTwo")}</Heading>
      </Variant>
      <Variant label="level 3">
        <Heading level={3}>{t("catalogShowcaseHeadingThree")}</Heading>
      </Variant>
      <Variant label="level 4">
        <Heading level={4}>{t("catalogShowcaseHeadingFour")}</Heading>
      </Variant>
    </VariantGrid>
  );
};
