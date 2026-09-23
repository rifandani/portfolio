"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { mountGlyphEngine } from "@/portfolio/utils/glyph-engine";

/**
 * The hero's Glyph Engine: a raymarched solid printed in IBM Plex Mono that
 * melts from icosahedron (craft) to blob (obsession) and locks back.
 *
 * It is decoration, so it is `aria-hidden` and owns no pointer events. The
 * renderer lives in `glyph-engine.ts`; this only gives it a canvas and tears it
 * down. Without script the box stays empty, which is the static fallback.
 */
export const GlyphEngine = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    return mountGlyphEngine(canvas);
  }, []);

  return (
    <div
      aria-hidden="true"
      className={twMerge("pointer-events-none aspect-square", className)}
    >
      <canvas ref={canvasRef} className="block size-full font-mono" />
    </div>
  );
};
