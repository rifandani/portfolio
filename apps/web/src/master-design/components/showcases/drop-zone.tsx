import { useTranslations } from "next-intl";

import { DropZone } from "@/core/components/ui/drop-zone";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const DropZoneShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <DropZone className="w-64">
          {t("catalogShowcaseDropFilesHere")}
        </DropZone>
      </Variant>

      <Variant label="isDisabled">
        <DropZone className="w-64" isDisabled>
          {t("catalogShowcaseDroppingDisabled")}
        </DropZone>
      </Variant>
    </VariantGrid>
  );
};
