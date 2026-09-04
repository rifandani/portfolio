import { ColorArea } from "@/core/components/ui/color-area";
import { Variant } from "@/master-design/components/variant";
import { brandHsl } from "@/master-design/constants/fixtures";

export const ColorAreaShowcase = () => (
  <Variant label="default">
    <ColorArea defaultValue={brandHsl} />
  </Variant>
);
