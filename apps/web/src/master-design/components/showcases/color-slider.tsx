import { useTranslations } from "next-intl";

import {
  ColorSlider,
  ColorSliderOutput,
  ColorSliderTrack,
} from "@/core/components/ui/color-slider";
import { ColorThumb } from "@/core/components/ui/color-thumb";
import { Label } from "@/core/components/ui/field";
import { Variant } from "@/master-design/components/variant";
import { brandHsl } from "@/master-design/constants/fixtures";

export const ColorSliderShowcase = () => {
  const t = useTranslations();

  return (
    <Variant className="w-64" label="hue">
      <ColorSlider channel="hue" defaultValue={brandHsl}>
        <Label>{t("catalogShowcaseHue")}</Label>
        <ColorSliderOutput />
        <ColorSliderTrack>
          <ColorThumb />
        </ColorSliderTrack>
      </ColorSlider>
    </Variant>
  );
};
