import { SiteFooter } from "@/core/components/site-footer";
import { SiteHeader } from "@/core/components/site-header";

/**
 * Chrome shared by every public route, so a new surface only writes its own
 * content. Home, About, Projects, and Posts all render through this.
 */
export const SiteShell = ({ children }: { children: React.ReactNode }) => (
  <>
    <SiteHeader />
    <main>{children}</main>
    <SiteFooter />
  </>
);
