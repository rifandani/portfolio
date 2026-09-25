import { useTranslations } from "next-intl";

import { Toggle } from "@/core/components/ui/toggle";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ToggleShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="outline">
        <Toggle defaultSelected intent="outline">
          {t("catalogShowcaseOutline")}
        </Toggle>
      </Variant>

      <Variant label="plain">
        <Toggle intent="plain">{t("catalogShowcasePlain")}</Toggle>
      </Variant>
    </VariantGrid>
  );
};
