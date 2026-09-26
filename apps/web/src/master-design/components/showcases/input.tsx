import { useTranslations } from "next-intl";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";

import { Label } from "@/core/components/ui/field";
import { Input, InputGroup } from "@/core/components/ui/input";
import { TextField } from "@/core/components/ui/text-field";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const InputShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <TextField className="w-64">
          <Label>{t("email")}</Label>
          <Input placeholder={t("catalogShowcaseEmailExample")} type="email" />
        </TextField>
      </Variant>

      <Variant label="InputGroup">
        <TextField className="w-64">
          <Label>{t("catalogShowcaseSearch")}</Label>
          <InputGroup>
            <HiMiniMagnifyingGlass aria-hidden="true" data-slot="icon" />
            <Input placeholder={t("catalogShowcaseFindSomething")} />
          </InputGroup>
        </TextField>
      </Variant>

      <Variant label="isDisabled">
        <TextField className="w-64" defaultValue="you@example.com" isDisabled>
          <Label>{t("email")}</Label>
          <Input />
        </TextField>
      </Variant>
    </VariantGrid>
  );
};
