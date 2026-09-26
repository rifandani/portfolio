import type { SVGProps } from "react";

/**
 * Logo geometry on a 1112-unit square: a white disc with a navy fill and a
 * teal fill on top, and the "R" left as the white between them. Plain paths
 * with no `clipPath`, so several copies on one page never share an `id`.
 * `public/favicon.svg` and the OG image draw the same data.
 */
export const BRAND_LOGO_SIZE = 1112;

export const BRAND_LOGO_FILLS = [
  // Brand colors, not theme tokens: the logo keeps its colors in both themes.
  {
    d: "M84.7 261H637.5A190 175 0 0 1 637.5 611H537.3L896.7 995.4A556 556 0 1 0 84.7 261Z",
    fill: "#0E2137",
  },
  {
    d: "M47.3 331.5L759.5 1073.4A556 556 0 0 1 47.3 331.5Z",
    fill: "#03A0A7",
  },
] as const;

/**
 * The logo as a standalone SVG file, from the same data. The brand guidelines
 * copy and download it; it matches `public/favicon.svg`.
 */
export const brandLogoSvgMarkup = [
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${BRAND_LOGO_SIZE} ${BRAND_LOGO_SIZE}">`,
  `<circle cx="${BRAND_LOGO_SIZE / 2}" cy="${BRAND_LOGO_SIZE / 2}" r="${BRAND_LOGO_SIZE / 2}" fill="#fff"/>`,
  ...BRAND_LOGO_FILLS.map(({ d, fill }) => `<path fill="${fill}" d="${d}"/>`),
  "</svg>",
].join("");

/** The logo as a decorative inline SVG. Name it on the element that holds it. */
export const BrandLogo = (props: SVGProps<SVGSVGElement>) => (
  <svg
    aria-hidden="true"
    viewBox={`0 0 ${BRAND_LOGO_SIZE} ${BRAND_LOGO_SIZE}`}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle
      cx={BRAND_LOGO_SIZE / 2}
      cy={BRAND_LOGO_SIZE / 2}
      fill="white"
      r={BRAND_LOGO_SIZE / 2}
    />
    {BRAND_LOGO_FILLS.map(({ d, fill }) => (
      <path d={d} fill={fill} key={d} />
    ))}
  </svg>
);
