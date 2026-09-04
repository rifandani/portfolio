import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import { Radio, RadioField, RadioGroup } from "@/core/components/ui/radio";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const RadioShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <RadioGroup defaultValue="apple">
          <Label>{t("catalogShowcaseFruit")}</Label>
          <RadioField value="apple">
            <Radio>{t("catalogShowcaseApple")}</Radio>
          </RadioField>
          <RadioField value="banana">
            <Radio>{t("catalogShowcaseBanana")}</Radio>
          </RadioField>
          <RadioField value="cherry">
            <Radio>Cherry</Radio>
          </RadioField>
        </RadioGroup>
      </Variant>

      <Variant label="isDisabled">
        <RadioGroup defaultValue="banana" isDisabled>
          <Label>{t("catalogShowcaseFruit")}</Label>
          <RadioField value="apple">
            <Radio>{t("catalogShowcaseApple")}</Radio>
          </RadioField>
          <RadioField value="banana">
            <Radio>{t("catalogShowcaseBanana")}</Radio>
          </RadioField>
          <RadioField value="cherry">
            <Radio>Cherry</Radio>
          </RadioField>
        </RadioGroup>
      </Variant>
    </VariantGrid>
  );
};
