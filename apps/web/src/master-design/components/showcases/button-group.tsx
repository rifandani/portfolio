import { useTranslations } from "next-intl";

import { Button } from "@/core/components/ui/button";
import { ButtonGroup } from "@/core/components/ui/button-group";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ButtonGroupShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="horizontal">
        <ButtonGroup>
          <Button intent="outline">{t("catalogShowcaseLeft")}</Button>
          <Button intent="outline">{t("catalogShowcaseCenter")}</Button>
          <Button intent="outline">{t("catalogShowcaseRight")}</Button>
        </ButtonGroup>
      </Variant>

      <Variant label="vertical">
        <ButtonGroup orientation="vertical">
          <Button intent="outline">{t("catalogShowcaseTop")}</Button>
          <Button intent="outline">{t("catalogShowcaseMiddle")}</Button>
          <Button intent="outline">{t("catalogShowcaseBottom")}</Button>
        </ButtonGroup>
      </Variant>
    </VariantGrid>
  );
};
