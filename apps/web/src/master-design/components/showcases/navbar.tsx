import { useTranslations } from "next-intl";

import {
  Navbar,
  NavbarItem,
  NavbarProvider,
  NavbarSection,
  NavbarSpacer,
  NavbarStart,
} from "@/core/components/ui/navbar";
import { Variant, VariantGrid } from "@/master-design/components/variant";

export const NavbarShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-full max-w-xl" label="default">
        <NavbarProvider className="overflow-hidden rounded-lg border">
          <Navbar>
            <NavbarStart className="text-sm font-semibold">
              {t("catalogShowcaseAcme")}
            </NavbarStart>
            <NavbarSection>
              <NavbarItem href="#" isCurrent>
                {t("catalogShowcaseHome")}
              </NavbarItem>
              <NavbarItem href="#">{t("catalogShowcaseDocs")}</NavbarItem>
            </NavbarSection>
            <NavbarSpacer />
          </Navbar>
        </NavbarProvider>
      </Variant>
    </VariantGrid>
  );
};
