import { twMerge } from "tailwind-merge";

/**
 * Shared silhouette for project and post cards: soft-rect 8px, hairline
 * border, resting-edge shadow. Flat at rest — hover lights, never lifts.
 *
 * Work rows are deliberately outside it: they hang off the work rail and carry
 * no shell. Every card that uses this shell is also a link, so the shell is
 * only ever the base for `cardLinkClass`.
 */
const cardShellClass = twMerge(
  "border-border bg-card text-card-fg rounded-lg border p-5 shadow-xs sm:p-6"
);

/**
 * Interactive variant. The whole card is one link target.
 *
 * `card-lit` (`src/core/styles/globals.css`) carries the raking-light hover: it
 * replaces the old flat `secondary` wash with the same wash graded around the
 * pointer, wakes the hairline to Helm Teal where the light reaches it, and
 * drifts the preview print. The card itself never moves, so Flat-By-Default
 * holds. Keyboard focus lights it from the centre and keeps the outline ring.
 */
export const cardLinkClass = twMerge(
  cardShellClass,
  "card-lit block no-underline",
  "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2"
);

/**
 * The preview frame: fixed geometry with the border and the clip. The print
 * inside it is the only thing that moves, which is why the frame owns
 * `overflow-hidden` instead of the image owning the border.
 */
export const cardMediaClass = twMerge(
  "border-border aspect-[1200/630] w-28 shrink-0 self-start overflow-hidden rounded-lg border sm:w-40"
);

/**
 * Card body. Positioned so it paints above the `card-lit` wash pseudo-element,
 * which is the element's first child in paint order.
 */
export const cardBodyClass = twMerge("relative flex gap-4 sm:gap-5");
