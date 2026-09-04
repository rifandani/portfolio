import { useTranslations } from "next-intl";

import { FileTrigger } from "@/core/components/ui/file-trigger";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const FileTriggerShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <FileTrigger>{t("catalogShowcaseUploadFile")}</FileTrigger>
      </Variant>

      <Variant label="allowsMultiple">
        <FileTrigger allowsMultiple>
          {t("catalogShowcaseUploadFiles")}
        </FileTrigger>
      </Variant>

      <Variant label="isDisabled">
        <FileTrigger isDisabled>{t("catalogShowcaseUploadFile")}</FileTrigger>
      </Variant>
    </VariantGrid>
  );
};
