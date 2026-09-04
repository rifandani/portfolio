import { useTranslations } from "next-intl";

import {
  Checkbox,
  CheckboxField,
  CheckboxGroup,
} from "@/core/components/ui/checkbox";
import { Description } from "@/core/components/ui/field";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const CheckboxShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <CheckboxField>
          <Checkbox>{t("catalogShowcaseAcceptTerms")}</Checkbox>
        </CheckboxField>
      </Variant>

      <Variant label="selected">
        <CheckboxField defaultSelected>
          <Checkbox>{t("catalogShowcaseSubscribe")}</Checkbox>
        </CheckboxField>
      </Variant>

      <Variant label="isDisabled">
        <CheckboxField isDisabled>
          <Checkbox>{t("catalogShowcaseUnavailable")}</Checkbox>
        </CheckboxField>
      </Variant>

      <Variant label="CheckboxField">
        <CheckboxField defaultSelected>
          <Checkbox>{t("catalogShowcaseMarketingEmails")}</Checkbox>
          <Description>{t("catalogShowcaseOccasionalUpdates")}</Description>
        </CheckboxField>
      </Variant>

      <Variant label="CheckboxGroup">
        <CheckboxGroup defaultValue={["billing"]}>
          <CheckboxField value="analytics">
            <Checkbox>{t("catalogShowcaseAnalytics")}</Checkbox>
          </CheckboxField>
          <CheckboxField value="billing">
            <Checkbox>{t("catalogShowcaseBilling")}</Checkbox>
          </CheckboxField>
          <CheckboxField isDisabled value="legacy">
            <Checkbox>{t("catalogShowcaseLegacy")}</Checkbox>
          </CheckboxField>
        </CheckboxGroup>
      </Variant>
    </VariantGrid>
  );
};
