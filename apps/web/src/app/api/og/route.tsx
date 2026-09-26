/* oxlint-disable react-doctor/no-giant-component */
import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import type { ReactElement } from "react";

import { createError, useLogger, withEvlog } from "@/core/utils/evlog";

import { parseOgRequest, rethrowNonError } from "./og-params";
// const interSemiBold = fetch(
//   new URL('./Inter-SemiBold.ttf', import.meta.url),
// ).then(res => res.arrayBuffer())

const LIGHT_GRID_PATHS = [
  "M421 0V307",
  "M469 0V307",
  "M516 0V307",
  "M564 0V307",
  "M374 0V307",
  "M326 0V307",
  "M135 0V307",
  "M183 0V307",
  "M231 0V307",
  "M278 0V307",
  "M88 0V307",
  "M40 0V307",
  "M707 0V307",
  "M755 0V307",
  "M802 0V307",
  "M659 0V307",
  "M612 0V307",
  "M841 105L0 105",
  "M841 57L0 57",
  "M841 153L0 153",
  "M841 201L0 201",
  "M841 9L0 9",
] as const;

const DARK_GRID_PATHS = [
  "M421.2 4.2V306.8",
  "M468.8 4.2V306.8",
  "M516.5 4.2V306.8",
  "M564.1 4.2V306.8",
  "M373.5 4.2V306.8",
  "M325.9 4.2V306.8",
  "M841 105L0 105",
  "M841 57L0 57",
  "M841 153L0 153",
  "M841 201L0 201",
  "M841 9L0 9",
  "M135.3 4.2V306.8",
  "M182.9 4.2V306.8",
  "M230.6 4.2V306.8",
  "M278.2 4.2V306.8",
  "M87.6 4.2V306.8",
  "M40 4.2V306.8",
  "M707.1 4.2V306.8",
  "M754.7 4.2V306.8",
  "M802.4 4.2V306.8",
  "M659.4 4.2V306.8",
  "M611.8 4.2V306.8",
] as const;

// Satori accepts only intrinsic elements inside `<svg>`, so the shared parts
// are plain elements and functions, never components.
const ogGridPaths = (
  paths: readonly string[],
  stroke: string
): ReactElement[] =>
  paths.map((d) => (
    <path
      d={d}
      key={d}
      stroke={stroke}
      strokeDasharray="3.18 3.18"
      strokeWidth="0.794118"
    />
  ));

// Same geometry as `public/favicon.svg` (1112 units wide), scaled to a 96px
// mark centered above the title.
const BRAND_LOGO = (
  <g transform="translate(373.5, 105.5) scale(0.0863309)">
    <clipPath id="brand_logo_clip">
      <circle cx="556" cy="556" r="556" />
    </clipPath>
    <g clipPath="url(#brand_logo_clip)">
      <rect fill="#0E2137" height="1112" width="1112" />
      <path
        d="M-80 261H637.5A190 175 0 0 1 637.5 611H537.3L1124.5 1239H918.5L-20.4 261Z"
        fill="white"
      />
      <path d="M-20.4 261L918.5 1239H-180V261Z" fill="#03A0A7" />
    </g>
  </g>
);

const LightBrandSvg = (): ReactElement => (
  <svg
    aria-hidden="true"
    fill="none"
    height="441"
    viewBox="0 0 843 441"
    width="843"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_5_3)">
      <rect fill="white" height="441" width="843" />
      {ogGridPaths(LIGHT_GRID_PATHS, "#999999")}
      <rect fill="url(#paint0_radial_5_3)" height="441" width="841" x="2" />
      <g filter="url(#filter0_f_5_3)" opacity="0.3">
        <path
          d="M380.2 410C317.7 297.1 289.6 147.2 339.9 79.1C390.3 10.9 509 45.4 547 153.9L452 205L380.2 410Z"
          fill="#009689"
        />
      </g>

      {BRAND_LOGO}
    </g>
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="766"
        id="filter0_f_5_3"
        width="633"
        x="114"
        y="-156"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          mode="normal"
          result="shape"
        />
        <feGaussianBlur
          result="effect1_foregroundBlur_5_3"
          stdDeviation="100"
        />
      </filter>
      <radialGradient
        cx="0"
        cy="0"
        gradientTransform="translate(418 -39) rotate(90) scale(336 640.762)"
        gradientUnits="userSpaceOnUse"
        id="paint0_radial_5_3"
        r="1"
      >
        <stop stopColor="white" stopOpacity="0" />
        <stop offset="1" stopColor="white" />
      </radialGradient>
      <clipPath id="clip0_5_3">
        <rect fill="white" height="441" width="843" />
      </clipPath>
    </defs>
  </svg>
);
const DarkBrandSvg = (): ReactElement => (
  <svg
    aria-hidden="true"
    fill="none"
    height="441"
    viewBox="0 0 843 441"
    width="843"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0_1_4)">
      <rect fill="black" height="441" width="843" />
      {ogGridPaths(DARK_GRID_PATHS, "#333333")}
      <rect fill="url(#paint0_radial_1_4)" height="441" width="841" />
      <g filter="url(#filter0_f_1_4)" opacity="0.3">
        <path
          d="M380.2 410C317.7 297.1 289.6 147.2 339.9 79.1C390.3 10.9 509 45.4 547 153.9L452 205L380.2 410Z"
          fill="#009689"
        />
      </g>

      {BRAND_LOGO}
    </g>
    <defs>
      <filter
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
        height="766"
        id="filter0_f_1_4"
        width="633"
        x="114"
        y="-156"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend
          in="SourceGraphic"
          in2="BackgroundImageFix"
          mode="normal"
          result="shape"
        />
        <feGaussianBlur
          result="effect1_foregroundBlur_1_4"
          stdDeviation="100"
        />
      </filter>
      <radialGradient
        cx="0"
        cy="0"
        gradientTransform="translate(416 -39) rotate(90) scale(336 640.762)"
        gradientUnits="userSpaceOnUse"
        id="paint0_radial_1_4"
        r="1"
      >
        <stop stopOpacity="0" />
        <stop offset="1" />
      </radialGradient>
      <clipPath id="clip0_1_4">
        <rect fill="white" height="441" width="843" />
      </clipPath>
    </defs>
  </svg>
);

export const GET = withEvlog((req: NextRequest): Response | ImageResponse => {
  const log = useLogger();
  try {
    const { isLight, title } = parseOgRequest(req);
    log.set({ og: { isLight, title } });
    const Background = isLight ? LightBrandSvg : DarkBrandSvg;
    return new ImageResponse(
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Background />
        <div
          style={{
            color: isLight ? "black" : "white",
            fontFamily: "Inter",
            fontSize: "48px",
            fontWeight: "600",
            left: "50%",
            letterSpacing: "-0.04em",
            maxWidth: "750px",
            overflowWrap: "break-word",
            position: "absolute",
            textAlign: "center",
            top: "250px",
            transform: "translateX(-50%)",
            whiteSpace: "pre-wrap",
            wordWrap: "break-word",
          }}
        >
          {title}
        </div>
      </div>,
      {
        width: 843,
        height: 441,
      }
    );
  } catch (error) {
    rethrowNonError(error);
    throw createError({
      fix: "Please try again later",
      message: "Failed to generate the image",
      status: 500,
      why: "Failed to generate the image",
    });
  }
});
