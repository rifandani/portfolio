import { useTranslations } from "next-intl";

import { Skeleton } from "@/core/components/ui/skeleton";
import { Variant, VariantGrid } from "@/master-design/components/variant";

const Sample = () => {
  const t = useTranslations();

  return (
    <div>
      <div>
        <p className="text-sm">{t("catalogShowcaseSampleName")}</p>
      </div>
    </div>
  );
};

export const SkeletonShowcase = () => (
  <VariantGrid>
    <Variant label="isLoading">
      <Skeleton isLoading>
        <Sample />
      </Skeleton>
    </Variant>
    <Variant label="loaded">
      <Skeleton>
        <Sample />
      </Skeleton>
    </Variant>
  </VariantGrid>
);
