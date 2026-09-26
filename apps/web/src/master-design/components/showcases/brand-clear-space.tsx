import { useTranslations } from "next-intl";
import { twJoin } from "tailwind-merge";

import type { MessageKey } from "@/core/feature-flags/registry";
import {
  GuideLabel,
  GuideLead,
  LogoArt,
} from "@/master-design/components/showcases/brand-art";

/** The clear-space unit, in diagram units: a quarter of the logo width. */
const X = 30;
const LOGO = X * 4;
const ZONE = LOGO + X * 2;
const WIDTH = 360;
const HEIGHT = 260;
const ZONE_LEFT = (WIDTH - ZONE) / 2;
const ZONE_TOP = (HEIGHT - ZONE) / 2;

/** Construction lines through the zone edge and the logo edge, both ways. */
const GUIDES_X = [
  ZONE_LEFT,
  ZONE_LEFT + X,
  ZONE_LEFT + X + LOGO,
  ZONE_LEFT + ZONE,
];
const GUIDES_Y = [ZONE_TOP, ZONE_TOP + X, ZONE_TOP + X + LOGO, ZONE_TOP + ZONE];

/** One ghost logo, `x` wide, centred in each margin band. */
const GHOSTS = [
  { x: ZONE_LEFT + X + (LOGO - X) / 2, y: ZONE_TOP },
  { x: ZONE_LEFT + X + (LOGO - X) / 2, y: ZONE_TOP + X + LOGO },
  { x: ZONE_LEFT, y: ZONE_TOP + X + (LOGO - X) / 2 },
  { x: ZONE_LEFT + X + LOGO, y: ZONE_TOP + X + (LOGO - X) / 2 },
];

const GHOST_FILLS = ["currentColor", "currentColor"] as const;

/** One step of the size ladder. The sizes the site itself draws carry a note. */
interface SizeStep {
  px: number;
  noteKey?: MessageKey;
}

/** Largest first, down to the floor. */
const SIZES: SizeStep[] = [
  { px: 64 },
  { px: 48 },
  { px: 32, noteKey: "brandSizeHeader" },
  { px: 24 },
  { px: 16, noteKey: "brandSizeMinimum" },
];

/** Decorative: the figure's caption and the lead say what it draws. */
const ClearSpaceDiagram = () => {
  const logoWidthRuleY = ZONE_TOP - 16;
  const unitRuleX = ZONE_LEFT + ZONE + 16;

  return (
    <svg
      aria-hidden="true"
      className="text-muted-fg h-auto w-full"
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        className="stroke-current opacity-40"
        strokeDasharray="3 4"
        strokeWidth={1}
      >
        {GUIDES_Y.map((y) => (
          <line key={`y${y}`} x1={0} x2={WIDTH} y1={y} y2={y} />
        ))}
        {GUIDES_X.map((x) => (
          <line key={`x${x}`} x1={x} x2={x} y1={0} y2={HEIGHT} />
        ))}
      </g>

      <rect
        className="fill-current opacity-[0.06]"
        height={ZONE}
        width={ZONE}
        x={ZONE_LEFT}
        y={ZONE_TOP}
      />

      {GHOSTS.map(({ x, y }) => (
        <LogoArt
          className="opacity-30"
          disc={false}
          fills={GHOST_FILLS}
          height={X}
          key={`${x}-${y}`}
          width={X}
          x={x}
          y={y}
        />
      ))}

      <LogoArt height={LOGO} width={LOGO} x={ZONE_LEFT + X} y={ZONE_TOP + X} />

      {/* Dimension rules: the logo is 4x wide; the margin is x. */}
      <g className="stroke-current" strokeWidth={1}>
        <line
          x1={ZONE_LEFT + X}
          x2={ZONE_LEFT + X + LOGO}
          y1={logoWidthRuleY}
          y2={logoWidthRuleY}
        />
        <line
          x1={ZONE_LEFT + X}
          x2={ZONE_LEFT + X}
          y1={logoWidthRuleY - 4}
          y2={logoWidthRuleY + 4}
        />
        <line
          x1={ZONE_LEFT + X + LOGO}
          x2={ZONE_LEFT + X + LOGO}
          y1={logoWidthRuleY - 4}
          y2={logoWidthRuleY + 4}
        />
        <line x1={unitRuleX} x2={unitRuleX} y1={ZONE_TOP} y2={ZONE_TOP + X} />
        <line
          x1={unitRuleX - 4}
          x2={unitRuleX + 4}
          y1={ZONE_TOP}
          y2={ZONE_TOP}
        />
        <line
          x1={unitRuleX - 4}
          x2={unitRuleX + 4}
          y1={ZONE_TOP + X}
          y2={ZONE_TOP + X}
        />
      </g>
      <g className="fill-fg font-mono" fontSize={12}>
        <text
          dominantBaseline="auto"
          textAnchor="middle"
          x={WIDTH / 2}
          y={logoWidthRuleY - 6}
        >
          4x
        </text>
        <text dominantBaseline="central" x={unitRuleX + 8} y={ZONE_TOP + X / 2}>
          x
        </text>
      </g>
    </svg>
  );
};

/**
 * The margin the logo keeps around itself, drawn as a construction sheet, and
 * the size ladder down to the smallest size it is drawn at.
 */
export const BrandClearSpaceShowcase = () => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-6">
        <GuideLead>{t("brandClearSpaceDescription")}</GuideLead>
        <figure className="border-border bg-bg flex flex-col rounded-lg border">
          <div className="mx-auto w-full max-w-xl px-4 py-8 sm:px-8 sm:py-10">
            <ClearSpaceDiagram />
            <span className="sr-only">{t("brandClearSpaceDiagram")}</span>
          </div>
          <figcaption className="border-border text-muted-fg border-t px-4 py-3 font-mono text-xs/5 sm:px-5">
            {t("brandClearSpaceUnit")}
          </figcaption>
        </figure>
      </div>

      <div className="flex flex-col gap-4">
        <GuideLabel>{t("brandMinSizeHeading")}</GuideLabel>
        <GuideLead>{t("brandMinSizeDescription")}</GuideLead>
        {/* `role="list"`: Safari drops list semantics from a list without markers. */}
        {/* oxlint-disable-next-line jsx-a11y/no-redundant-roles */}
        <ul className="flex flex-wrap items-end gap-x-8 gap-y-6" role="list">
          {SIZES.map(({ px: size, noteKey }) => (
            <li className="flex flex-col items-start gap-3" key={size}>
              <LogoArt height={size} width={size} />
              <span className="flex flex-col font-mono text-xs/5">
                <span className="text-fg tabular-nums">
                  {t("brandSizePx", { size })}
                </span>
                <span
                  className={twJoin("text-muted-fg", !noteKey && "invisible")}
                >
                  {noteKey ? t(noteKey) : "—"}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
