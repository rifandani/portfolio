import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { TagField } from "@/core/components/ui/tag-field";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TagFieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <TagField className="w-64" defaultValue={["react", "aria"]} name="tags">
          <Label>{t("catalogShowcaseTags")}</Label>
          <Input placeholder={t("catalogShowcaseAddTag")} />
        </TagField>
      </Variant>

      <Variant label="isDisabled">
        <TagField
          className="w-64"
          defaultValue={["react"]}
          isDisabled
          name="tags-disabled"
        >
          <Label>{t("catalogShowcaseTags")}</Label>
          <Input />
        </TagField>
      </Variant>
    </VariantGrid>
  );
};
