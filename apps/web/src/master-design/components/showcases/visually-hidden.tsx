import { useTranslations } from "next-intl";

import { VisuallyHidden } from "@/core/components/ui/visually-hidden";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const VisuallyHiddenShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="with visible label">
        <span className="text-sm">
          {t("catalogShowcaseSave")}
          <VisuallyHidden>
            {t("catalogShowcaseSaveDocumentDrafts")}
          </VisuallyHidden>
        </span>
      </Variant>
    </VariantGrid>
  );
};
