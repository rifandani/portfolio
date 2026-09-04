import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import { Tag, TagGroup, TagList } from "@/core/components/ui/tag-group";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TagGroupShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <TagGroup>
          <Label>{t("catalogShowcaseCategories")}</Label>
          <TagList>
            <Tag>{t("catalogShowcaseReact")}</Tag>
            <Tag>{t("catalogShowcaseAria")}</Tag>
            <Tag>{t("catalogShowcaseDesign")}</Tag>
          </TagList>
        </TagGroup>
      </Variant>

      <Variant label="selected">
        <TagGroup defaultSelectedKeys={["react"]} selectionMode="multiple">
          <Label>{t("catalogShowcaseCategories")}</Label>
          <TagList>
            <Tag id="react">{t("catalogShowcaseReact")}</Tag>
            <Tag id="aria">{t("catalogShowcaseAria")}</Tag>
            <Tag id="design">{t("catalogShowcaseDesign")}</Tag>
          </TagList>
        </TagGroup>
      </Variant>

      <Variant label="isDisabled">
        <TagGroup>
          <Label>{t("catalogShowcaseCategories")}</Label>
          <TagList>
            <Tag isDisabled>{t("catalogShowcaseReact")}</Tag>
            <Tag>{t("catalogShowcaseAria")}</Tag>
          </TagList>
        </TagGroup>
      </Variant>
    </VariantGrid>
  );
};
