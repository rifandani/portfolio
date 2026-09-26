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
            <TextField defaultValue={t("catalogShowcaseSampleName")}>
              <Label>{t("name")}</Label>
              <Input />
              <Description>{t("catalogShowcaseShownOnProfile")}</Description>
            </TextField>
          </FieldGroup>
        </Fieldset>
      </Variant>

      <Variant label="FieldError">
        <TextField className="w-64" defaultValue="not-an-email" isInvalid>
          <Label>{t("email")}</Label>
          <Input />
          <FieldError>{t("catalogShowcaseValidEmail")}</FieldError>
        </TextField>
      </Variant>
    </VariantGrid>
  );
};
