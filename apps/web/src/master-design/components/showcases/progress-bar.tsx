import { useTranslations } from "next-intl";

import {
  ProgressBar,
  ProgressBarHeader,
  ProgressBarTrack,
  ProgressBarValue,
} from "@/core/components/ui/progress-bar";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ProgressBarShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-56" label="value 40">
        <ProgressBar
          aria-label={t("catalogShowcaseUpload")}
          className="w-56"
          value={40}
        >
          <ProgressBarHeader>
            <span>{t("catalogShowcaseUploading")}</span>
            <ProgressBarValue />
          </ProgressBarHeader>
          <ProgressBarTrack />
        </ProgressBar>
      </Variant>
    </VariantGrid>
  );
};
