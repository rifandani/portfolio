import { ColorArea } from "@/core/components/ui/color-area";

import { brandHsl } from "@/master-design/constants/fixtures";
import { Variant } from "@/master-design/components/variant";

export const ColorAreaShowcase = () => (
  <Variant label="default">
    <ColorArea defaultValue={brandHsl} />
  </Variant>
);
