import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { useTranslations } from "next-intl";

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
            <MagnifyingGlassIcon data-slot="icon" />
            <Input placeholder={t("catalogShowcaseFindSomething")} />
          </InputGroup>
        </TextField>
      </Variant>

      <Variant label="isDisabled">
        <TextField className="w-64" isDisabled>
          <Label>{t("email")}</Label>
          <Input defaultValue="you@example.com" />
        </TextField>
      </Variant>
    </VariantGrid>
  );
};
