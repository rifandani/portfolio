import { useTranslations } from "next-intl";

import { BarList } from "@/core/components/ui/bar-list";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const BarListShowcase = () => {
  const t = useTranslations();
  const sources = [
    { name: t("catalogShowcaseDirect"), value: 1200 },
    { name: t("catalogShowcaseOrganic"), value: 890 },
    { name: t("catalogShowcaseReferral"), value: 420 },
  ];

  return (
    <VariantGrid>
      <Variant className="w-72" label="descending">
        <BarList className="w-72" data={sources} />
      </Variant>
    </VariantGrid>
  );
};
