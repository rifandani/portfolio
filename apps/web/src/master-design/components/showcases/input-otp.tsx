import { useTranslations } from "next-intl";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPLabel,
  InputOTPSlot,
} from "@/core/components/ui/input-otp";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const InputOtpShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <div className="space-y-2">
          <InputOTPLabel>{t("catalogShowcaseOneTimeCode")}</InputOTPLabel>
          <InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Variant>

      <Variant label="disabled">
        <div className="space-y-2">
          <InputOTPLabel>{t("catalogShowcaseOneTimeCode")}</InputOTPLabel>
          <InputOTP disabled maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </Variant>
    </VariantGrid>
  );
};
