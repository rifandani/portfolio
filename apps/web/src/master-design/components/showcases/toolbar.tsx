import { useTranslations } from "next-intl";

import {
  Toolbar,
  ToolbarGroup,
  ToolbarItem,
  ToolbarSeparator,
} from "@/core/components/ui/toolbar";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ToolbarShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Toolbar aria-label={t("catalogShowcaseFormatting")}>
          <ToolbarGroup>
            <ToolbarItem>{t("catalogShowcaseBold")}</ToolbarItem>
            <ToolbarItem>{t("catalogShowcaseItalic")}</ToolbarItem>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <ToolbarItem>{t("catalogShowcaseLink")}</ToolbarItem>
          </ToolbarGroup>
        </Toolbar>
      </Variant>
    </VariantGrid>
  );
};
