import { useTranslations } from "next-intl";
import { HiOutlineArrowDownTray, HiOutlineSquare2Stack } from "react-icons/hi2";

import { brandLogoSvgMarkup } from "@/core/components/brand-logo";
import { Button } from "@/core/components/ui/button";
import {
  Snippet,
  SnippetTab,
  SnippetTabPanel,
  SnippetTabPanels,
  SnippetTabsList,
} from "@/core/components/ui/snippet";
import {
  BrandPlate,
  downloadLogoPng,
  downloadLogoSvg,
  GuideLead,
  LOGO_PNG_SIZE,
  LogoArt,
} from "@/master-design/components/showcases/brand-art";
import { CopyButton } from "@/post/components/copy-button.client";

const IMPORT_LINE = 'import { BrandLogo } from "@/core/components/brand-logo";';
const RENDER_LINE = '<BrandLogo className="size-8" />';

/**
 * The logo on the two grounds a file goes onto, then the ways to take it:
 * copy the SVG, download it as SVG or PNG, or render the component.
 */
export const BrandLogoShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8">
      <GuideLead>{t("brandLogoDescription")}</GuideLead>

      <div className="grid gap-4 sm:grid-cols-2">
        <figure className="flex flex-col gap-2">
          <BrandPlate className="aspect-[4/3]" ground="light">
            <LogoArt className="size-28 sm:size-36" />
          </BrandPlate>
          <figcaption className="text-muted-fg font-mono text-xs/5">
            {t("brandLogoOnLight")}
          </figcaption>
        </figure>
        <figure className="flex flex-col gap-2">
          <BrandPlate className="aspect-[4/3]" ground="dark">
            <LogoArt className="size-28 sm:size-36" />
          </BrandPlate>
          <figcaption className="text-muted-fg font-mono text-xs/5">
            {t("brandLogoOnDark")}
          </figcaption>
        </figure>
      </div>

      <div className="flex flex-wrap items-center gap-x-2 gap-y-3">
        <CopyButton
          copiedLabel={t("brandCopied")}
          icon={HiOutlineSquare2Stack}
          label={t("brandCopySvg")}
          status={t("brandSvgCopied")}
          value={brandLogoSvgMarkup}
        />
        <Button intent="outline" onPress={downloadLogoSvg} size="sm">
          <HiOutlineArrowDownTray aria-hidden="true" data-slot="icon" />
          {t("brandDownloadSvg")}
        </Button>
        <Button
          intent="outline"
          onPress={() => {
            void downloadLogoPng();
          }}
          size="sm"
        >
          <HiOutlineArrowDownTray aria-hidden="true" data-slot="icon" />
          {t("brandDownloadPng")}
        </Button>
        <span className="text-muted-fg ms-1 font-mono text-xs/5 tabular-nums">
          {t("brandPngSize", { size: LOGO_PNG_SIZE })}
        </span>
      </div>

      <div className="flex max-w-xl flex-col gap-3">
        <Snippet className="border-border" defaultSelectedKey="render">
          <SnippetTabsList aria-label={t("brandCodeAria")}>
            <SnippetTab id="render">{t("brandCodeRender")}</SnippetTab>
            <SnippetTab id="import">{t("brandCodeImport")}</SnippetTab>
          </SnippetTabsList>
          <SnippetTabPanels>
            <SnippetTabPanel className="font-mono" id="render">
              {RENDER_LINE}
            </SnippetTabPanel>
            <SnippetTabPanel className="font-mono" id="import">
              {IMPORT_LINE}
            </SnippetTabPanel>
          </SnippetTabPanels>
        </Snippet>
        <GuideLead>{t("brandLogoCodeNote")}</GuideLead>
      </div>
    </div>
  );
};
