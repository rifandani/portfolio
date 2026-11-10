import { useTranslations } from "next-intl";

import { Loader } from "@/components/ui/loader";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const LoaderShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="ring">
        <Loader aria-label={t("catalogShowcaseLoading")} variant="ring" />
      </Variant>
      <Variant label="spin">
        <Loader aria-label={t("catalogShowcaseLoading")} variant="spin" />
      </Variant>
    </VariantGrid>
  );
};
