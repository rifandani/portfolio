import { useTranslations } from "next-intl";

import { ListBox, ListBoxItem } from "@/core/components/ui/list-box";
import { Variant, VariantGrid } from "@/master-design/components/variant";
import { createFruits } from "@/master-design/constants/fixtures";

export const ListBoxShowcase = () => {
  const t = useTranslations();
  const fruits = createFruits(t);

  return (
    <VariantGrid>
      <Variant label="single">
        <ListBox
          aria-label={t("catalogShowcaseFruit")}
          className="w-56 border"
          defaultSelectedKeys={["apple"]}
          items={fruits}
          selectionMode="single"
        >
          {(item) => <ListBoxItem>{item.name}</ListBoxItem>}
        </ListBox>
      </Variant>
    </VariantGrid>
  );
};
