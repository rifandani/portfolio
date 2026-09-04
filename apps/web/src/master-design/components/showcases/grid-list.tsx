import { useTranslations } from "next-intl";

import {
  GridList,
  GridListDescription,
  GridListItem,
  GridListLabel,
} from "@/core/components/ui/grid-list";
import { Variant, VariantGrid } from "@/master-design/components/variant";
import { demoUsers } from "@/master-design/constants/fixtures";

export const GridListShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-72" label="users">
        <GridList
          aria-label={t("catalogShowcaseUsers")}
          className="w-72"
          items={demoUsers}
          selectionMode="single"
        >
          {(user) => (
            <GridListItem id={user.id} textValue={user.name}>
              <div className="flex min-w-0 flex-col">
                <GridListLabel>{user.name}</GridListLabel>
                <GridListDescription>{user.email}</GridListDescription>
              </div>
            </GridListItem>
          )}
        </GridList>
      </Variant>
    </VariantGrid>
  );
};
