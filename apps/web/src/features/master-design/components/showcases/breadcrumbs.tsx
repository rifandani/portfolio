import { useTranslations } from "next-intl";

import { Breadcrumbs, BreadcrumbsItem } from "@/components/ui/breadcrumbs";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const BreadcrumbsShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Breadcrumbs>
          <BreadcrumbsItem href="#">{t("catalogShowcaseHome")}</BreadcrumbsItem>
          <BreadcrumbsItem href="#">
            {t("catalogShowcaseLibrary")}
          </BreadcrumbsItem>
          <BreadcrumbsItem>{t("catalogShowcaseData")}</BreadcrumbsItem>
        </Breadcrumbs>
      </Variant>
    </VariantGrid>
  );
};
