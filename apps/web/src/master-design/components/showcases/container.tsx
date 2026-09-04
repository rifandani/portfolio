import { useTranslations } from "next-intl";

import { Container } from "@/core/components/ui/container";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ContainerShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-full" label="default">
        <Container className="bg-muted rounded-lg border py-3 text-sm">
          {t("catalogShowcaseDefaultPadding")}
        </Container>
      </Variant>
      <Variant className="w-full" label="constrained">
        <Container
          className="bg-muted rounded-lg border py-3 text-sm"
          constrained
        >
          {t("catalogShowcaseConstrainedPadding")}
        </Container>
      </Variant>
    </VariantGrid>
  );
};
