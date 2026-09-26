import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/core/components/ui/select";
import { Variant, VariantGrid } from "@/master-design/components/variant";
import { createFruits } from "@/master-design/constants/fixtures";

export const SelectShowcase = () => {
  const t = useTranslations();
  const fruits = createFruits(t);

  return (
    <VariantGrid>
      <Variant label="default">
        <Select className="w-56" defaultSelectedKey="apple">
          <Label>{t("catalogShowcaseFruit")}</Label>
          <SelectTrigger />
          <SelectContent items={fruits}>
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </SelectContent>
        </Select>
      </Variant>

      <Variant label="placeholder">
        <Select
          aria-label={t("catalogShowcaseFruit")}
          className="w-56"
          placeholder={t("catalogShowcasePickOne")}
        >
          <SelectTrigger />
          <SelectContent items={fruits}>
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </SelectContent>
        </Select>
      </Variant>

      <Variant label="isDisabled">
        <Select
          aria-label={t("catalogShowcaseFruit")}
          className="w-56"
          defaultSelectedKey="banana"
          isDisabled
        >
          <SelectTrigger />
          <SelectContent items={fruits}>
            {(item) => <SelectItem>{item.name}</SelectItem>}
          </SelectContent>
        </Select>
      </Variant>
    </VariantGrid>
  );
};
