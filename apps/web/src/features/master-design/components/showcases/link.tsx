import { useTranslations } from "next-intl";

import { Link } from "@/components/ui/link";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const LinkShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Link href="#">{t("catalogShowcaseDocumentation")}</Link>
      </Variant>
    </VariantGrid>
  );
};
