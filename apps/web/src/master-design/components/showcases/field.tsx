import { useTranslations } from "next-intl";

import {
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Label,
  Legend,
} from "@/core/components/ui/field";
import { Input } from "@/core/components/ui/input";
import { TextField } from "@/core/components/ui/text-field";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const FieldShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <Fieldset className="w-64">
          <Legend>{t("profile")}</Legend>
          <Description>{t("catalogShowcasePublicDetails")}</Description>
          <FieldGroup>
            <TextField>
              <Label>{t("name")}</Label>
              <Input defaultValue="Ava Thompson" />
              <Description>{t("catalogShowcaseShownOnProfile")}</Description>
            </TextField>
          </FieldGroup>
        </Fieldset>
      </Variant>

      <Variant label="FieldError">
        <TextField className="w-64" isInvalid>
          <Label>{t("email")}</Label>
          <Input defaultValue="not-an-email" />
          <FieldError>{t("catalogShowcaseValidEmail")}</FieldError>
        </TextField>
      </Variant>
    </VariantGrid>
  );
};
