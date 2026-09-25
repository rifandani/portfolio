"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useRef } from "react";
import { flushSync } from "react-dom";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";

import { Button } from "@/core/components/ui/button";

/** Kept in step with the sweep rules in globals.css. */
const SWEEP_DURATION_MS = 500;

/**
 * Radius of the smallest circle centred on (x, y) that still covers the
 * viewport, so the sweep always finishes on a fully repainted page.
 */
const coverRadius = (x: number, y: number) =>
  Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  );

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Two-state theme switch. The first paint has no resolved theme, so both icons
 * ship and the `dark` class on `<html>` picks one — that keeps the markup
 * identical on server and client instead of forcing a mount guard.
 *
 * The swap runs through the View Transitions API: the incoming theme is
 * revealed by a circle growing out of this button, so the new palette reads as
 * something the user poured onto the page from the control they pressed.
 *
 * React's `<ViewTransition>` component is the wrong tool here — it only fires
 * for navigations, Suspense reveals and `useDeferredValue`, while the theme is
 * a class on `<html>` written by next-themes. So we drive the browser API
 * directly and `flushSync` the update, otherwise the browser snapshots the DOM
 * before next-themes has moved the class.
 * @see https://nextjs.org/docs/app/guides/view-transitions
 */
export const ThemeToggle = () => {
  const t = useTranslations();
  const { resolvedTheme, setTheme } = useTheme();
  const ref = useRef<HTMLButtonElement>(null);

  const swapTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const sweep = async (button: HTMLButtonElement) => {
    const { top, left, width, height } = button.getBoundingClientRect();
    const x = left + width / 2;
    const y = top + height / 2;
    const radius = coverRadius(x, y);

    const transition = document.startViewTransition(() => {
      flushSync(swapTheme);
    });

    try {
      await transition.ready;
    } catch {
      // A skipped transition rejects `ready`. The theme has already changed, so
      // there is nothing left to animate.
      return;
    }

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${radius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: SWEEP_DURATION_MS,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    );
  };

  const onPress = () => {
    const button = ref.current;

    // No support, no button geometry, or a user who asked for stillness: the
    // theme still changes, it just changes at once.
    if (!(button && document.startViewTransition) || prefersReducedMotion()) {
      swapTheme();
      return;
    }

    void sweep(button);
  };

  return (
    <Button
      ref={ref}
      intent="outline"
      aria-label={t("toggleTheme")}
      onPress={onPress}
    >
      <HiOutlineSun
        aria-hidden="true"
        data-slot="icon"
        className="size-6 dark:hidden"
      />
      <HiOutlineMoon
        aria-hidden="true"
        data-slot="icon"
        className="hidden size-6 dark:block"
      />
    </Button>
  );
};
