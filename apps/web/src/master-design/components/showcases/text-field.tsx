import { useTranslations } from "next-intl";

import { Description, FieldError, Label } from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { TextField } from "@/core/components/ui/text-field";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const TextFieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <TextField className="w-64">
          <Label>{t("email")}</Label>
          <Input placeholder={t("catalogShowcaseEmailExample")} type="email" />
        </TextField>
      </Variant>

      <Variant label="description">
        <TextField className="w-64">
          <Label>{t("catalogShowcaseUsername")}</Label>
          <Input placeholder="rifandani" />
          <Description>{t("catalogShowcasePublicHandle")}</Description>
        </TextField>
      </Variant>

      <Variant label="isInvalid">
        <TextField className="w-64" defaultValue="not-an-email" isInvalid>
          <Label>{t("email")}</Label>
          <Input />
          <FieldError>{t("catalogShowcaseValidEmail")}</FieldError>
        </TextField>
      </Variant>

      <Variant label="isDisabled">
        <TextField className="w-64" isDisabled>
          <Label>{t("email")}</Label>
          <Input placeholder={t("catalogShowcaseEmailExample")} />
        </TextField>
      </Variant>
    </VariantGrid>
  );
};
