import { useTranslations } from "next-intl";

import { Label } from "@/components/ui/field";
import { SearchField, SearchInput } from "@/components/ui/search-field";
import {
  Variant,
  VariantGrid,
} from "@/features/master-design/components/variant";

export const SearchFieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <SearchField className="w-56">
          <Label>{t("catalogShowcaseSearch")}</Label>
          <SearchInput placeholder={t("catalogShowcaseFindSomething")} />
        </SearchField>
      </Variant>

      <Variant label="defaultValue">
        <SearchField className="w-56" defaultValue="monorepo">
          <SearchInput />
        </SearchField>
      </Variant>

      <Variant label="isDisabled">
        <SearchField className="w-56" isDisabled>
          <SearchInput placeholder={t("catalogShowcaseDisabled")} />
        </SearchField>
      </Variant>
    </VariantGrid>
  );
};
