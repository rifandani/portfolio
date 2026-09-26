import { useTranslations } from "next-intl";

import {
  ComboBox,
  ComboBoxContent,
  ComboBoxInput,
  ComboBoxItem,
} from "@/core/components/ui/combo-box";
import { Label } from "@/core/components/ui/field";
import { Variant, VariantGrid } from "@/master-design/components/variant";
import { createFruits } from "@/master-design/constants/fixtures";

export const ComboBoxShowcase = () => {
  const t = useTranslations();
  const fruits = createFruits(t);

  return (
    <VariantGrid>
      <Variant label="default">
        <ComboBox className="w-56" defaultSelectedKey="apple">
          <Label>{t("catalogShowcaseFruit")}</Label>
          <ComboBoxInput />
          <ComboBoxContent items={fruits}>
            {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
          </ComboBoxContent>
        </ComboBox>
      </Variant>

      <Variant label="placeholder">
        <ComboBox aria-label={t("catalogShowcaseFruit")} className="w-56">
          <ComboBoxInput placeholder={t("catalogShowcasePickFruit")} />
          <ComboBoxContent items={fruits}>
            {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
          </ComboBoxContent>
        </ComboBox>
      </Variant>

      <Variant label="isDisabled">
        <ComboBox
          aria-label={t("catalogShowcaseFruit")}
          className="w-56"
          defaultSelectedKey="banana"
          isDisabled
        >
          <ComboBoxInput />
          <ComboBoxContent items={fruits}>
            {(item) => <ComboBoxItem>{item.name}</ComboBoxItem>}
          </ComboBoxContent>
        </ComboBox>
      </Variant>
    </VariantGrid>
  );
};
