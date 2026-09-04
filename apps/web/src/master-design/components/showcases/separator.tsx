import { useTranslations } from "next-intl";

import { Separator } from "@/core/components/ui/separator";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const SeparatorShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-56" label="horizontal">
        <div className="w-full">
          <p className="text-sm">{t("catalogShowcaseAbove")}</p>
          <Separator className="my-3" />
          <p className="text-sm">{t("catalogShowcaseBelow")}</p>
        </div>
      </Variant>
      <Variant label="vertical">
        <div className="flex h-12 items-center gap-3">
          <p className="text-sm">{t("catalogShowcaseLeft")}</p>
          <Separator orientation="vertical" />
          <p className="text-sm">{t("catalogShowcaseRight")}</p>
        </div>
      </Variant>
    </VariantGrid>
  );
};
