import { useTranslations } from "next-intl";

import { ColorField } from "@/core/components/ui/color-field";
import { Label } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { Variant } from "@/master-design/components/variant";

export const ColorFieldShowcase = () => {
  const t = useTranslations();

  return (
    <Variant label="default">
      <ColorField className="w-64" defaultValue="#0d6efd">
        <Label>{t("catalogShowcaseBrand")}</Label>
        <Input />
      </ColorField>
    </Variant>
  );
};
