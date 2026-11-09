import { useTranslations } from "next-intl";

import { Label } from "@/components/ui/field";
import { NumberField, NumberInput } from "@/components/ui/number-field";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const NumberFieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <NumberField className="w-40" defaultValue={10}>
          <Label>{t("catalogShowcaseQuantity")}</Label>
          <NumberInput />
        </NumberField>
      </Variant>

      <Variant label="isInvalid">
        <NumberField className="w-40" defaultValue={-1} isInvalid>
          <Label>{t("catalogShowcaseQuantity")}</Label>
          <NumberInput />
        </NumberField>
      </Variant>

      <Variant label="isDisabled">
        <NumberField className="w-40" defaultValue={5} isDisabled>
          <Label>{t("catalogShowcaseQuantity")}</Label>
          <NumberInput />
        </NumberField>
      </Variant>
    </VariantGrid>
  );
};
