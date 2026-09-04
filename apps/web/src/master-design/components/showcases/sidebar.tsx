import { useTranslations } from "next-intl";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarItem,
  SidebarLabel,
  SidebarProvider,
  SidebarSection,
} from "@/core/components/ui/sidebar";

import { Variant, VariantGrid } from "@/master-design/components/variant";

export const SidebarShowcase = () => {
  const t = useTranslations();

  return (
    <VariantGrid>
      <Variant className="w-full max-w-xl" label="defaultOpen">
        <SidebarProvider
          className="h-64 overflow-hidden rounded-lg border"
          defaultOpen
        >
          <Sidebar collapsible="none">
            <SidebarHeader className="text-sm font-semibold">
              {t("catalogShowcaseAcme")}
            </SidebarHeader>
            <SidebarContent>
              <SidebarSection label={t("catalogShowcaseNav")}>
                <SidebarItem href="#" isCurrent>
                  <SidebarLabel>{t("catalogShowcaseHome")}</SidebarLabel>
                </SidebarItem>
                <SidebarItem href="#">
                  <SidebarLabel>{t("settings")}</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarContent>
          </Sidebar>
          <SidebarInset>
            <div className="text-muted-fg p-4 text-sm">
              {t("catalogShowcaseInsetContent")}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Variant>
    </VariantGrid>
  );
};
