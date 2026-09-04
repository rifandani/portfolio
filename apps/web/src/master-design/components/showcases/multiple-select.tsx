import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import {
  MultipleSelect,
  MultipleSelectContent,
  MultipleSelectItem,
} from "@/core/components/ui/multiple-select";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const MultipleSelectShowcase = () => {
  const t = useTranslations();
  const fruits = [
    { id: "apple", name: t("catalogShowcaseApple") },
    { id: "banana", name: t("catalogShowcaseBanana") },
    { id: "cherry", name: t("catalogShowcaseCherry") },
  ];

  return (
    <VariantGrid>
      <Variant label="default">
        <MultipleSelect className="w-64" defaultSelectedKey="apple">
          <Label>{t("catalogShowcaseFruits")}</Label>
          <MultipleSelectContent items={fruits}>
            {(item) => <MultipleSelectItem>{item.name}</MultipleSelectItem>}
          </MultipleSelectContent>
        </MultipleSelect>
      </Variant>

      <Variant label="placeholder">
        <MultipleSelect
          aria-label={t("catalogShowcaseFruits")}
          className="w-64"
          placeholder={t("catalogShowcasePickFruits")}
        >
          <MultipleSelectContent items={fruits}>
            {(item) => <MultipleSelectItem>{item.name}</MultipleSelectItem>}
          </MultipleSelectContent>
        </MultipleSelect>
      </Variant>

      <Variant label="isDisabled">
        <MultipleSelect
          aria-label={t("catalogShowcaseFruits")}
          className="w-64"
          defaultSelectedKey="banana"
          isDisabled
        >
          <MultipleSelectContent items={fruits}>
            {(item) => <MultipleSelectItem>{item.name}</MultipleSelectItem>}
          </MultipleSelectContent>
        </MultipleSelect>
      </Variant>
    </VariantGrid>
  );
};
