import {
  ColorSlider,
  ColorSliderTrack,
} from "@/core/components/ui/color-slider";
import { ColorThumb } from "@/core/components/ui/color-thumb";

import { brandHsl } from "@/master-design/constants/fixtures";
import { Variant } from "@/master-design/components/variant";

export const ColorThumbShowcase = () => (
  <Variant className="w-64" label="in slider">
    <ColorSlider channel="hue" defaultValue={brandHsl}>
      <ColorSliderTrack>
        <ColorThumb />
      </ColorSliderTrack>
    </ColorSlider>
  </Variant>
);
