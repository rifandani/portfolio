import { useTranslations } from "next-intl";

import { ShowMore } from "@/core/components/ui/show-more";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ShowMoreShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-64" label="button">
        <ShowMore>{t("catalogShowcaseShowMore")}</ShowMore>
      </Variant>

      <Variant className="w-64" label="text">
        <ShowMore as="text" text={t("catalogShowcaseOrContinueWith")} />
      </Variant>
    </VariantGrid>
  );
};
