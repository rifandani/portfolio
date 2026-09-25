import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import {
  NativeSelect,
  NativeSelectContent,
} from "@/core/components/ui/native-select";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const NativeSelectShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <NativeSelect className="w-56">
          <Label>{t("catalogShowcaseFruit")}</Label>
          <NativeSelectContent defaultValue="apple">
            <option value="apple">{t("catalogShowcaseApple")}</option>
            <option value="banana">{t("catalogShowcaseBanana")}</option>
            <option value="cherry">{t("catalogShowcaseCherry")}</option>
          </NativeSelectContent>
        </NativeSelect>
      </Variant>

      <Variant label="isInvalid">
        <NativeSelect className="w-56">
          <Label>{t("catalogShowcaseFruit")}</Label>
          <NativeSelectContent isInvalid>
            <option value="">{t("catalogShowcasePickOne")}</option>
            <option value="apple">{t("catalogShowcaseApple")}</option>
            <option value="banana">{t("catalogShowcaseBanana")}</option>
          </NativeSelectContent>
        </NativeSelect>
      </Variant>

      <Variant label="disabled">
        <NativeSelect className="w-56">
          <Label>{t("catalogShowcaseFruit")}</Label>
          <NativeSelectContent defaultValue="banana" disabled>
            <option value="banana">{t("catalogShowcaseBanana")}</option>
          </NativeSelectContent>
        </NativeSelect>
      </Variant>
    </VariantGrid>
  );
};
