import { useTranslations } from "next-intl";

import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/core/components/ui/toggle-group";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ToggleGroupShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="single">
        <ToggleGroup defaultSelectedKeys={["day"]}>
          <ToggleGroupItem id="day">{t("catalogShowcaseDay")}</ToggleGroupItem>
          <ToggleGroupItem id="week">
            {t("catalogShowcaseWeek")}
          </ToggleGroupItem>
          <ToggleGroupItem id="month">
            {t("catalogShowcaseMonth")}
          </ToggleGroupItem>
        </ToggleGroup>
      </Variant>
    </VariantGrid>
  );
};
