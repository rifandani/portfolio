import { useTranslations } from "next-intl";
import type { ComponentProps } from "react";
import { HiMiniCheck, HiMiniXMark } from "react-icons/hi2";
import { twJoin } from "tailwind-merge";

import { BRAND_LOGO_FILLS } from "@/core/components/brand-logo";
import type { MessageKey } from "@/core/feature-flags/registry";
import type { BrandGround } from "@/master-design/components/showcases/brand-art";
import {
  BrandPlate,
  GuideLead,
  LogoArt,
} from "@/master-design/components/showcases/brand-art";

interface Specimen {
  id: string;
  captionKey: MessageKey;
  isCorrect: boolean;
  ground: BrandGround;
  art: ComponentProps<typeof LogoArt>;
}

const SWAPPED_FILLS = BRAND_LOGO_FILLS.map(({ fill }) => fill).toReversed();

/**
 * One correct use, then the changes that make it a different mark. Each
 * specimen is the real logo data with one thing done wrong, so the page
 * shows the mistake rather than describing it.
 */
const SPECIMENS: Specimen[] = [
  {
    id: "as-drawn",
    captionKey: "brandMisuseDo",
    isCorrect: true,
    ground: "light",
    art: {},
  },
  {
    id: "stretch",
    captionKey: "brandMisuseStretch",
    isCorrect: false,
    ground: "light",
    art: { className: "scale-x-150" },
  },
  {
    id: "rotate",
    captionKey: "brandMisuseRotate",
    isCorrect: false,
    ground: "light",
    art: { className: "-rotate-24" },
  },
  {
    id: "recolor",
    captionKey: "brandMisuseRecolor",
    isCorrect: false,
    ground: "light",
    art: { fills: SWAPPED_FILLS },
  },
  {
    id: "effects",
    captionKey: "brandMisuseEffects",
    isCorrect: false,
    ground: "light",
    art: { className: "drop-shadow-[0_6px_10px_rgb(3_160_167/0.6)]" },
  },
  {
    id: "disc",
    captionKey: "brandMisuseDisc",
    isCorrect: false,
    ground: "dark",
    art: { disc: false },
  },
];

const GRID = "grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3";

export const BrandMisuseShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-8">
      <GuideLead>{t("brandMisuseDescription")}</GuideLead>
      {/* `role="list"`: Safari drops list semantics from a list without markers. */}
      {/* oxlint-disable-next-line jsx-a11y/no-redundant-roles */}
      <ul className={GRID} role="list">
        {SPECIMENS.map(({ id, captionKey, isCorrect, ground, art }) => {
          const { className, ...rest } = art;
          const Mark = isCorrect ? HiMiniCheck : HiMiniXMark;
          return (
            <li key={id}>
              <figure className="flex flex-col gap-3">
                <BrandPlate className="aspect-[4/3]" ground={ground}>
                  <LogoArt
                    className={twJoin("size-14 sm:size-20", className)}
                    {...rest}
                  />
                </BrandPlate>
                <figcaption className="flex items-start gap-2 text-base/6 text-pretty sm:text-sm/6">
                  <Mark
                    aria-hidden="true"
                    className={twJoin(
                      "mt-1 size-4 shrink-0 sm:mt-0.5",
                      isCorrect
                        ? "text-success-subtle-fg"
                        : "text-danger-subtle-fg"
                    )}
                  />
                  <span>
                    <span className="sr-only">
                      {t(isCorrect ? "brandCorrect" : "brandIncorrect")}
                    </span>
                    {t(captionKey)}
                  </span>
                </figcaption>
              </figure>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
