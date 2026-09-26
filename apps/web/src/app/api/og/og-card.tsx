/* oxlint-disable react-doctor/only-export-components, react-doctor/no-inline-exhaustive-style -- Satori lays out inline styles only; there is no stylesheet */
import type { CSSProperties, ReactElement, ReactNode } from "react";

import { brandLogoSvgMarkup } from "@/core/components/brand-logo";
import type { StillCell } from "@/portfolio/utils/glyph-engine";

import { stillRuns } from "./og-still";
import type { StillTone } from "./og-still";

/**
 * The OG card: a Paper sheet resting on the grained Sand Canvas, lit from the
 * top left the way a Content Card is lit under the pointer. It is the site's
 * own card at share scale, so a link reads as Rizki's before its title does.
 *
 * Satori lays this out, not a browser: every box is flex, colors are sRGB hex
 * (Satori has no OKLCH), and the tokens below mirror `globals.css` light.
 * Lines are 2px, because a feed shows the card at about half size.
 */
const ink = {
  canvas: "#fdfcf9",
  paper: "#ffffff",
  fg: "#1c1917",
  muted: "#746c67",
  hairline: "#e4e0de",
  teal: "#009689",
} as const;

/** Muted Ink at the share of the site's `color-mix` rules. */
const mutedAt = (alpha: number) => `rgb(116 108 103 / ${alpha})`;
const tealAt = (alpha: number) => `rgb(0 150 137 / ${alpha})`;
const fogAt = (alpha: number) => `rgb(231 229 228 / ${alpha})`;

const face = {
  display: "Roboto",
  sans: "Quicksand",
  mono: "IBM Plex Mono",
} as const;

/** Meta spaced caps: the colophon voice, as the stamp and sheet labels. */
const metaCaps: CSSProperties = {
  color: ink.muted,
  fontFamily: face.mono,
  fontSize: 20,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
};

/** Where the light sits on the sheet, as a share of its box. */
const LIGHT_AT = "14% 0%";

/**
 * The canvas grain from `body::before`: the same fractal noise, stretched the
 * same way, tinted black at the site's opacity. The tile is drawn at twice
 * the site's speck size, so it survives the feed's downscale as grain and
 * not as a flat grey.
 */
const GRAIN = `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><filter id="g" color-interpolation-filters="sRGB"><feTurbulence type="fractalNoise" baseFrequency="0.45" numOctaves="3" stitchTiles="stitch"/><feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0"/><feComponentTransfer><feFuncA type="linear" slope="2.2" intercept="-0.6"/></feComponentTransfer></filter><rect width="1200" height="630" filter="url(#g)"/></svg>`
)}`;

/** The brand logo, the same file as `public/favicon.svg`. */
const LOGO = `data:image/svg+xml,${encodeURIComponent(brandLogoSvgMarkup)}`;
const LOGO_PX = 48;

/**
 * The sheet and its chrome: the brand logo signs every card, and `locator`,
 * when there is one, is the path the card stands for, in mono, as the Status
 * Screen prints its line of record.
 */
const OgFrame = ({
  locator,
  children,
}: {
  locator?: string;
  children: ReactNode;
}): ReactElement => (
  <div
    style={{
      backgroundColor: ink.canvas,
      display: "flex",
      height: "100%",
      padding: 40,
      position: "relative",
      width: "100%",
    }}
  >
    {/* oxlint-disable-next-line nextjs/no-img-element -- Satori renders plain <img> only */}
    <img
      alt=""
      height={630}
      src={GRAIN}
      style={{ left: 0, opacity: 0.0475, position: "absolute", top: 0 }}
      width={1200}
    />
    {/* The Hairline, waking to Helm Teal where the light reaches it. */}
    <div
      style={{
        backgroundImage: `radial-gradient(circle at ${LIGHT_AT}, ${ink.teal} 0%, ${tealAt(0.45)} 14%, ${ink.hairline} 38%)`,
        borderRadius: 18,
        boxShadow: "0 2px 4px rgb(0 0 0 / 0.05)",
        display: "flex",
        flex: 1,
        padding: 2,
      }}
    >
      <div
        style={{
          backgroundColor: ink.paper,
          // The secondary wash graded around the light, and a Helm Teal
          // specular at the site's ~16% under it.
          backgroundImage: `radial-gradient(circle at ${LIGHT_AT}, ${tealAt(0.08)} 0%, transparent 22%), radial-gradient(circle at ${LIGHT_AT}, ${fogAt(0.7)} 0%, ${ink.paper} 42%)`,
          borderRadius: 16,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          padding: "44px 56px 48px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* oxlint-disable-next-line nextjs/no-img-element -- Satori renders plain <img> only */}
          <img alt="" height={LOGO_PX} src={LOGO} width={LOGO_PX} />
          {locator && (
            <span
              style={{
                color: ink.muted,
                fontFamily: face.mono,
                fontSize: 20,
              }}
            >
              {locator}
            </span>
          )}
        </div>
        {children}
      </div>
    </div>
  </div>
);

const Title = ({
  size,
  lines,
  children,
}: {
  size: number;
  lines: number;
  children: string;
}): ReactElement => (
  <div
    style={{
      color: ink.fg,
      display: "block",
      fontFamily: face.display,
      fontSize: size,
      letterSpacing: "-0.025em",
      lineClamp: lines,
      lineHeight: 1.14,
    }}
  >
    {children}
  </div>
);

const Description = ({
  size,
  lines,
  children,
}: {
  size: number;
  lines: number;
  children: string;
}): ReactElement => (
  <div
    style={{
      color: ink.muted,
      display: "block",
      fontFamily: face.sans,
      fontSize: size,
      lineClamp: lines,
      lineHeight: 1.5,
      marginTop: 20,
    }}
  >
    {children}
  </div>
);

/* ------------------------------------------------------------------------ */
/* Page                                                                     */
/* ------------------------------------------------------------------------ */

/**
 * Glyph size of the still: small enough that the facets resolve as shapes,
 * large enough that the glyphs stay print after the feed's downscale.
 */
const GLYPH_PX = 11;
const GLYPH_LINE = 1.18;
/** IBM Plex Mono advances 0.6em per glyph. */
const GLYPH_ADVANCE = 0.6;
export const STILL_COLS = 58;
export const STILL_ROWS = 30;
/**
 * The card prints the craft half, not the reduced-motion mid-melt: at share
 * resolution the melt reads as a shaded disc, and the facets read as a solid.
 * Turned so one face points at the reader, a triangle ringed by its
 * neighbours, each in its own glyph: the view that reads as a polyhedron and
 * not as a ball.
 */
export const STILL_POSE = { morph: 0, pitch: -0.35, yaw: 1.05 } as const;
export const STILL_CELL = { w: GLYPH_ADVANCE, h: GLYPH_LINE } as const;

/**
 * Each ramp level prints in its own tone, from light Muted Ink to Warm
 * Graphite. On the canvas two inks are enough, because the glyphs are fine;
 * at share size the thin glyphs of neighbouring facets would merge, and one
 * tone per level prints each facet as one flat plane.
 */
const LEVEL_TONES = [
  "#d6d2cf",
  "#c2bcb8",
  "#aca5a0",
  "#958d88",
  "#7c746f",
  "#625b56",
  "#48423e",
  "#322d2a",
  "#1c1917",
] as const;

const toneColor = (tone: StillTone) => {
  if (tone === "signal") {
    return ink.teal;
  }
  return tone === "blank" ? "transparent" : (LEVEL_TONES[tone - 1] ?? ink.fg);
};

/** One row of the still, set as runs of one tone. */
const StillRow = ({ cells }: { cells: StillCell[] }): ReactElement => (
  <div style={{ display: "flex", height: GLYPH_PX * GLYPH_LINE }}>
    {stillRuns(cells).map((run, index) => (
      // oxlint-disable-next-line react/no-array-index-key -- runs are positional and never reorder
      <span
        key={index}
        style={{ color: toneColor(run.tone), whiteSpace: "pre" }}
      >
        {run.text}
      </span>
    ))}
  </div>
);

/**
 * A page: the title and the description in the left seven columns and the
 * Glyph Engine's still in the right five, as the home hero lays them out.
 */
export const OgPageCard = ({
  title,
  description,
  still,
}: {
  title: string;
  description?: string;
  still: StillCell[][];
}): ReactElement => (
  <OgFrame>
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        gap: 40,
        marginTop: 16,
      }}
    >
      <div style={{ display: "flex", flex: 7, flexDirection: "column" }}>
        <Title lines={4} size={title.length > 48 ? 56 : 72}>
          {title}
        </Title>
        {description && (
          <Description lines={3} size={26}>
            {description}
          </Description>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flex: 5,
          flexDirection: "column",
          fontFamily: face.mono,
          fontSize: GLYPH_PX,
          justifyContent: "center",
          lineHeight: GLYPH_LINE,
        }}
      >
        {still.map((cells, row) => (
          // oxlint-disable-next-line react/no-array-index-key -- rows are positional and never reorder
          <StillRow cells={cells} key={row} />
        ))}
      </div>
    </div>
  </OgFrame>
);

/* ------------------------------------------------------------------------ */
/* Post                                                                     */
/* ------------------------------------------------------------------------ */

/** Tick pitch of the reading ruler, twice the site's 6px. */
const TICK = 12;

/**
 * The reading ruler, inked the way the entry shows it under the light: the
 * whole scale faint, the minutes read in Warm Graphite.
 */
const Ruler = ({
  minutes,
  scale,
}: {
  minutes: number;
  scale: number;
}): ReactElement => {
  const width = scale * TICK + 2;
  const height = 24;
  const ticks = Array.from({ length: scale + 1 }, (_, minute) => minute);
  return (
    <svg
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect fill={mutedAt(0.22)} height={2} width={width} y={height - 2} />
      <rect
        fill={ink.fg}
        height={2}
        width={minutes * TICK + 2}
        y={height - 2}
      />
      {ticks.map((minute) => (
        <rect
          fill={minute <= minutes ? ink.fg : mutedAt(0.22)}
          height={minute % 5 === 0 ? height : 12}
          key={minute}
          width={2}
          x={minute * TICK}
          y={minute % 5 === 0 ? 0 : height - 12}
        />
      ))}
    </svg>
  );
};

/**
 * A Post: its Date Stamp, inked, beside the title and the summary, over the
 * reading ruler. The Postmark Log entry at share scale.
 */
export const OgPostCard = ({
  path,
  title,
  summary,
  stamp,
  ruler,
  readingTime,
}: {
  path: string;
  title: string;
  summary: string;
  stamp: { month: string; day: string; year: string };
  ruler: { minutes: number; scale: number };
  readingTime: string;
}): ReactElement => (
  <OgFrame locator={path}>
    <div
      style={{
        alignItems: "center",
        display: "flex",
        flex: 1,
        gap: 48,
        marginTop: 16,
      }}
    >
      <div
        style={{
          alignItems: "center",
          border: `2px solid ${ink.fg}`,
          borderRadius: 16,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          fontFamily: face.mono,
          height: 176,
          justifyContent: "center",
          position: "relative",
          width: 156,
        }}
      >
        <div
          style={{
            border: `2px solid ${ink.fg}`,
            borderRadius: 11,
            bottom: 4,
            left: 4,
            position: "absolute",
            right: 4,
            top: 4,
          }}
        />
        <span style={metaCaps}>{stamp.month}</span>
        <span
          style={{
            color: ink.fg,
            fontSize: 72,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
          }}
        >
          {stamp.day}
        </span>
        <span style={{ ...metaCaps, textTransform: "none" }}>{stamp.year}</span>
      </div>

      <div style={{ display: "flex", flex: 1, flexDirection: "column" }}>
        <Title lines={3} size={title.length > 44 ? 56 : 64}>
          {title}
        </Title>
        <Description lines={3} size={26}>
          {summary}
        </Description>
        <div
          style={{
            alignItems: "flex-end",
            display: "flex",
            gap: 20,
            marginTop: 32,
          }}
        >
          <Ruler minutes={ruler.minutes} scale={ruler.scale} />
          <span
            style={{
              color: ink.muted,
              fontFamily: face.mono,
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            {readingTime}
          </span>
        </div>
      </div>
    </div>
  </OgFrame>
);

/* ------------------------------------------------------------------------ */
/* Project                                                                  */
/* ------------------------------------------------------------------------ */

/** A registration mark's arm, and how far outside the frame it stands. */
const ARM = 20;
const MARK_OUT = 10;

const markArm = (corner: "tl" | "tr" | "bl" | "br"): CSSProperties[] => {
  const x = corner.endsWith("l") ? { left: -MARK_OUT } : { right: -MARK_OUT };
  const y = corner.startsWith("t") ? { top: -MARK_OUT } : { bottom: -MARK_OUT };
  const base = { backgroundColor: ink.fg, position: "absolute" } as const;
  return [
    { ...base, ...x, ...y, height: 2, width: ARM },
    { ...base, ...x, ...y, height: ARM, width: 2 },
  ];
};

const MARKS = (["tl", "tr", "bl", "br"] as const).flatMap(markArm);

/**
 * A Project: the Drawing Sheet at share scale. The preview is the drawing, in
 * registration marks drawn in (the sheet is lit), and the title block beside
 * it keeps the sheet number, the title, and the description.
 */
export const OgProjectCard = ({
  path,
  title,
  description,
  drawing,
  sheet,
  sheetLabel,
}: {
  path: string;
  title: string;
  description: string;
  /** A URL Satori can load: a `data:` URI or an absolute `https:` URL. */
  drawing: string | null;
  sheet: { number: string; total: string };
  sheetLabel: string;
}): ReactElement => (
  <OgFrame locator={path}>
    <div style={{ display: "flex", flex: 1, marginTop: 40 }}>
      <div
        style={{
          alignSelf: "center",
          display: "flex",
          flexShrink: 0,
          marginLeft: MARK_OUT,
          marginRight: 40,
          position: "relative",
        }}
      >
        {MARKS.map((style, index) => (
          // oxlint-disable-next-line react/no-array-index-key -- a fixed list of eight marks
          <div key={index} style={style} />
        ))}
        <div
          style={{
            backgroundColor: ink.canvas,
            border: `2px solid ${ink.hairline}`,
            borderRadius: 12,
            display: "flex",
            height: 256,
            overflow: "hidden",
            width: 488,
          }}
        >
          {drawing && (
            // oxlint-disable-next-line nextjs/no-img-element -- Satori renders plain <img> only
            <img alt="" height={252} src={drawing} width={484} />
          )}
        </div>
      </div>

      <div
        style={{
          borderLeft: `2px solid ${ink.hairline}`,
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          minWidth: 0,
          paddingLeft: 36,
        }}
      >
        <div
          style={{
            alignItems: "baseline",
            display: "flex",
            fontFamily: face.mono,
            justifyContent: "space-between",
          }}
        >
          <span style={{ alignItems: "baseline", display: "flex", gap: 12 }}>
            <span style={metaCaps}>{sheetLabel}</span>
            <span
              style={{
                color: ink.fg,
                fontSize: 60,
                letterSpacing: "-0.025em",
                lineHeight: 1,
              }}
            >
              {sheet.number}
            </span>
          </span>
          <span style={{ color: ink.muted, fontSize: 22 }}>
            / {sheet.total}
          </span>
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
        >
          <Title lines={2} size={title.length > 28 ? 38 : 44}>
            {title}
          </Title>
        </div>
        <Description lines={3} size={24}>
          {description}
        </Description>
      </div>
    </div>
  </OgFrame>
);
