import { useTranslations } from "next-intl";

import { Button } from "@/core/components/ui/button";
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from "@/core/components/ui/menu";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const MenuShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Menu>
          <MenuTrigger>
            <Button intent="outline">{t("catalogShowcaseOpen")}</Button>
          </MenuTrigger>
          <MenuContent aria-label={t("catalogShowcaseActions")}>
            <MenuItem id="a">{t("catalogShowcaseEdit")}</MenuItem>
            <MenuItem id="b">{t("catalogShowcaseDelete")}</MenuItem>
          </MenuContent>
        </Menu>
      </Variant>
    </VariantGrid>
  );
};
