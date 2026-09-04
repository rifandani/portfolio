import { ColorWheel } from "@/core/components/ui/color-wheel";

import { brandHsl } from "@/master-design/constants/fixtures";
import { Variant } from "@/master-design/components/variant";

export const ColorWheelShowcase = () => (
  <Variant label="default">
    <ColorWheel defaultValue={brandHsl} />
  </Variant>
);
