import { twMerge } from "tailwind-merge";

/**
 * Shared silhouette for every public content card: soft-rect 8px, hairline
 * border, resting-edge shadow. Flat at rest — hover washes, never lifts.
 */
export const cardShellClass = twMerge(
  "border-border bg-card text-card-fg rounded-lg border p-5 shadow-xs sm:p-6"
);

/** Interactive variant. The whole card is one link target. */
export const cardLinkClass = twMerge(
  cardShellClass,
  "block no-underline transition-colors",
  "hover:bg-secondary/40",
  "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2"
);
