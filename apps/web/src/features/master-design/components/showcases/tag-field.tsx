import { useTranslations } from "next-intl";

import { Label } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { TagField } from "@/components/ui/tag-field";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

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
