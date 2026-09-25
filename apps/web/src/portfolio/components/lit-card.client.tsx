"use client";

import { useEffect, useRef } from "react";
import { twMerge } from "tailwind-merge";

import { Link } from "@/core/components/ui/link";
import { cardLinkClass } from "@/portfolio/components/card-shell";

/**
 * A content card lit by the pointer.
 *
 * Everything visual lives in the `card-lit` rules; this only reports where the
 * light is, as `--lit-px` / `--lit-py` in normalised card space. The values are
 * written straight to the node because a re-render per `pointermove` would cost
 * far more than the effect is worth, and they are coalesced into one frame so a
 * fast pointer cannot outrun the compositor.
 *
 * Listeners are attached by hand rather than passed as props: React Aria's
 * `Link` forwards only the interaction props it knows about. With none
 * attached — no pointer, reduced motion, or no JS — the card keeps the centred
 * default light, so hover and focus still read.
 */
export const LitCard = ({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (
      !node ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    /**
     * Matches `--lit-fade`, the opacity transition the light fades out on.
     * Computed style normalises the unit, so `280ms` is read back as `.28s` —
     * the unit has to be honoured or the wait collapses to a fifth of a frame.
     */
    const fadeMs = (() => {
      const raw = getComputedStyle(node.firstElementChild ?? node)
        .getPropertyValue("--lit-fade")
        .trim();
      return fadeMsOf(raw);
    })();

    let frame = 0;
    let recentre = 0;

    const aim = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      node.style.setProperty(
        "--lit-px",
        String((event.clientX - rect.left) / rect.width)
      );
      node.style.setProperty(
        "--lit-py",
        String((event.clientY - rect.top) / rect.height)
      );
    };

    /** Coalesced into one frame so a fast pointer cannot outrun the compositor. */
    const track = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => aim(event));
    };

    /** Aim before the fade-in starts, so re-entry never shows the old position. */
    const enter = (event: PointerEvent) => {
      clearTimeout(recentre);
      cancelAnimationFrame(frame);
      aim(event);
    };

    /**
     * The light must not move while it is still on screen, so leaving keeps the
     * position exactly where the pointer left it and only stops tracking. The
     * centred default is restored once the fade has finished and nothing is
     * visible to move — that default is what a later keyboard focus lights on.
     */
    const release = () => {
      cancelAnimationFrame(frame);
      clearTimeout(recentre);
      recentre = window.setTimeout(() => {
        node.style.removeProperty("--lit-px");
        node.style.removeProperty("--lit-py");
      }, fadeMs + 20);
    };

    node.addEventListener("pointerenter", enter);
    node.addEventListener("pointermove", track);
    node.addEventListener("pointerleave", release);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(recentre);
      node.removeEventListener("pointerenter", enter);
      node.removeEventListener("pointermove", track);
      node.removeEventListener("pointerleave", release);
    };
  }, []);

  return (
    <div ref={ref}>
      <Link
        href={href}
        variant="plain"
        className={twMerge(cardLinkClass, className)}
      >
        {children}
      </Link>
    </div>
  );
};
