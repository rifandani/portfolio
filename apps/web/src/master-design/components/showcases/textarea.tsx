import { useTranslations } from "next-intl";

import { Label } from "@/core/components/ui/field";
import { TextField } from "@/core/components/ui/text-field";
import { Textarea } from "@/core/components/ui/textarea";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TextareaShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <TextField className="w-64">
          <Label>{t("catalogShowcaseBio")}</Label>
          <Textarea placeholder={t("catalogShowcaseTellAboutYourself")} />
        </TextField>
      </Variant>

      <Variant label="isInvalid">
        <TextField
          className="w-64"
          defaultValue={t("catalogShowcaseTooShort")}
          isInvalid
        >
          <Label>{t("catalogShowcaseBio")}</Label>
          <Textarea />
        </TextField>
      </Variant>

      <Variant label="isDisabled">
        <TextField
          className="w-64"
          defaultValue={t("catalogShowcaseCannotEdit")}
          isDisabled
        >
          <Label>{t("catalogShowcaseBio")}</Label>
          <Textarea />
        </TextField>
      </Variant>
    </VariantGrid>
  );
};
