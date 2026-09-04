import { useTranslations } from "next-intl";

import { Switch, SwitchField } from "@/core/components/ui/switch";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const SwitchShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <SwitchField>
          <Switch>{t("catalogShowcaseAirplaneMode")}</Switch>
        </SwitchField>
      </Variant>

      <Variant label="selected">
        <SwitchField defaultSelected>
          <Switch>{t("catalogShowcaseNotifications")}</Switch>
        </SwitchField>
      </Variant>

      <Variant label="isDisabled">
        <SwitchField isDisabled>
          <Switch>{t("catalogShowcaseUnavailable")}</Switch>
        </SwitchField>
      </Variant>
    </VariantGrid>
  );
};
