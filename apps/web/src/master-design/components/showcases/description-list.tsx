import { useTranslations } from "next-intl";

import {
  DescriptionDetails,
  DescriptionList,
  DescriptionTerm,
} from "@/core/components/ui/description-list";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const DescriptionListShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-full max-w-md" label="default">
        <DescriptionList>
          <DescriptionTerm>{t("name")}</DescriptionTerm>
          <DescriptionDetails>
            {t("catalogShowcaseSampleName")}
          </DescriptionDetails>
          <DescriptionTerm>{t("catalogShowcaseRole")}</DescriptionTerm>
          <DescriptionDetails>{t("catalogShowcaseAdmin")}</DescriptionDetails>
          <DescriptionTerm>{t("catalogShowcaseStatus")}</DescriptionTerm>
          <DescriptionDetails>{t("catalogShowcaseActive")}</DescriptionDetails>
        </DescriptionList>
      </Variant>
    </VariantGrid>
  );
};
