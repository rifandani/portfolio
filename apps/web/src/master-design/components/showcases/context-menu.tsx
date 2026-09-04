import { useTranslations } from "next-intl";
import { Pressable } from "react-aria-components/Pressable";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
} from "@/core/components/ui/context-menu";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const ContextMenuShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant label="default">
        <ContextMenu>
          <Pressable>
            <button
              className="text-muted-fg rounded-lg border border-dashed px-8 py-6 text-sm"
              type="button"
            >
              {t("catalogShowcaseRightClickHere")}
            </button>
          </Pressable>
          <ContextMenuContent>
            <ContextMenuItem id="a">{t("catalogShowcaseEdit")}</ContextMenuItem>
            <ContextMenuItem id="b">
              {t("catalogShowcaseDelete")}
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      </Variant>
    </VariantGrid>
  );
};
