import type { ReactNode, SVGProps } from "react";
import { twMerge } from "tailwind-merge";

import {
  BRAND_LOGO_FILLS,
  BRAND_LOGO_SIZE,
  brandLogoSvgMarkup,
} from "@/core/components/brand-logo";

/**
 * The two grounds a logo file is chosen for. They are fixed, not theme
 * tokens: a file goes onto the destination's background, whatever theme the
 * reader has on. Light is Paper; dark is the dark canvas as it renders.
 */
export const BRAND_GROUNDS = {
  light: "bg-white",
  dark: "bg-[#151312]",
} as const;

export type BrandGround = keyof typeof BRAND_GROUNDS;

/** A framed plate that holds one specimen on a fixed ground. */
export const BrandPlate = ({
  ground,
  className,
  children,
}: {
  ground: BrandGround;
  className?: string;
  children: ReactNode;
}) => (
  <div
    className={twMerge(
      "relative flex items-center justify-center overflow-hidden rounded-lg border",
      ground === "light" ? "border-border" : "border-white/10",
      BRAND_GROUNDS[ground],
      "forced-colors:bg-[Canvas]",
      className
    )}
  >
    {children}
  </div>
);

/**
 * The logo drawn from its own data, with the parts a misuse specimen changes
 * open to change: the fills, and whether the white disc is there.
 */
const LOGO_FILLS = BRAND_LOGO_FILLS.map(({ fill }) => fill);

export const LogoArt = ({
  fills = LOGO_FILLS,
  disc = true,
  ...props
}: SVGProps<SVGSVGElement> & {
  fills?: readonly string[];
  disc?: boolean;
}) => (
  <svg
    aria-hidden="true"
    viewBox={`0 0 ${BRAND_LOGO_SIZE} ${BRAND_LOGO_SIZE}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {disc && (
      <circle
        cx={BRAND_LOGO_SIZE / 2}
        cy={BRAND_LOGO_SIZE / 2}
        fill="white"
        r={BRAND_LOGO_SIZE / 2}
      />
    )}
    {BRAND_LOGO_FILLS.map(({ d }, index) => (
      <path d={d} fill={fills[index]} key={d} />
    ))}
  </svg>
);

const saveUrl = (url: string, fileName: string) => {
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  anchor.click();
};

export const LOGO_FILE_NAME = "rizki-logo";

/** The PNG edge, in px: large enough for print and slides. */
export const LOGO_PNG_SIZE = 1024;

const svgObjectUrl = () =>
  URL.createObjectURL(
    new Blob([brandLogoSvgMarkup], { type: "image/svg+xml" })
  );

export const downloadLogoSvg = () => {
  const url = svgObjectUrl();
  saveUrl(url, `${LOGO_FILE_NAME}.svg`);
  // The click starts the download at once; the URL is not needed after it.
  setTimeout(() => URL.revokeObjectURL(url), 0);
};

/**
 * Rasterises the SVG in the browser, so the PNG is drawn from the same data
 * as every other copy and no second file can drift from it. The corners
 * outside the disc stay transparent.
 */
export const downloadLogoPng = async () => {
  const source = svgObjectUrl();
  try {
    const image = new Image();
    image.src = source;
    await image.decode();
    const canvas = document.createElement("canvas");
    canvas.width = LOGO_PNG_SIZE;
    canvas.height = LOGO_PNG_SIZE;
    canvas
      .getContext("2d")
      ?.drawImage(image, 0, 0, LOGO_PNG_SIZE, LOGO_PNG_SIZE);
    saveUrl(
      canvas.toDataURL("image/png"),
      `${LOGO_FILE_NAME}-${LOGO_PNG_SIZE}.png`
    );
  } finally {
    URL.revokeObjectURL(source);
  }
};

/** A guideline's lead line: body copy in Muted Ink, held to a reading measure. */
export const GuideLead = ({ children }: { children: ReactNode }) => (
  <p className="text-muted-fg max-w-prose text-base/7 text-pretty sm:text-sm/6">
    {children}
  </p>
);

/** A sub-heading inside a guideline, in the Meta spaced caps. */
export const GuideLabel = ({ children }: { children: ReactNode }) => (
  <h4 className="text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase">
    {children}
  </h4>
);
