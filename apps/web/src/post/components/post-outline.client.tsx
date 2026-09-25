"use client";

import { useTranslations } from "next-intl";
import type { CSSProperties } from "react";
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { twJoin } from "tailwind-merge";

import type { OutlineEntry } from "@/post/utils/post-outline";

/**
 * A heading is the current section once its top passes this line, in px from
 * the viewport top. A jumped-to heading lands at its 80px scroll margin, so the
 * line sits below that: the section a reader jumps to is current at once.
 */
const ACTIVATION_LINE = 128;

/** Keys and gestures that mean the reader scrolls on their own again. */
const READER_SCROLL_EVENTS = ["wheel", "touchstart", "keydown"] as const;

const isAtPageEnd = () =>
  window.innerHeight + window.scrollY >=
  document.documentElement.scrollHeight - 2;

/** The last heading's id when the page end is reached and it is in view. */
const lastSectionAtPageEnd = (headings: HTMLElement[]) => {
  const last = headings.at(-1);
  const isInView =
    last && last.getBoundingClientRect().top < window.innerHeight;
  return isInView && isAtPageEnd() ? last.id : undefined;
};

/** The last heading above the activation line, else the first section. */
const lastPassedSection = (ids: string[], headings: HTMLElement[]) => {
  let [current] = ids;
  for (const heading of headings) {
    if (heading.getBoundingClientRect().top > ACTIVATION_LINE) {
      break;
    }
    current = heading.id;
  }
  return current;
};

/**
 * The last section whose heading passed the activation line. At the page end
 * the last section is current, because a short last section can never reach
 * the line.
 */
const currentSectionOf = (ids: string[]) => {
  const headings = ids.flatMap(
    (id) => document.querySelector<HTMLElement>(`#${CSS.escape(id)}`) ?? []
  );
  return lastSectionAtPageEnd(headings) ?? lastPassedSection(ids, headings);
};

/**
 * Scroll-spy for the Post Outline. A picked entry stays current until the
 * reader scrolls on their own: a jump near the page end cannot bring its
 * heading to the line, and the scroll position alone would name a neighbor.
 */
const useCurrentSection = (ids: string[]) => {
  const [currentId, setCurrentId] = useState(ids[0]);
  const pickedRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!pickedRef.current) {
        setCurrentId(currentSectionOf(ids));
      }
    };
    const schedule = () => {
      if (frame === 0) {
        frame = requestAnimationFrame(update);
      }
    };
    const release = () => {
      pickedRef.current = false;
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    for (const type of READER_SCROLL_EVENTS) {
      window.addEventListener(type, release, { passive: true });
    }
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const type of READER_SCROLL_EVENTS) {
        window.removeEventListener(type, release);
      }
    };
  }, [ids]);

  const pick = (id: string) => {
    pickedRef.current = true;
    setCurrentId(id);
  };

  return { currentId, pick };
};

/**
 * How far down the list the trace reaches: to the bottom of the current
 * entry. `null` until measured, so the server render draws no trace.
 */
const useTraceReach = (
  railRef: React.RefObject<HTMLDivElement | null>,
  currentId: string | undefined
) => {
  const [reach, setReach] = useState<number | null>(null);

  useLayoutEffect(() => {
    const rail = railRef.current;
    if (!rail || !currentId) {
      return;
    }
    const measure = () => {
      const link = rail.querySelector<HTMLElement>(
        `[data-outline-id="${CSS.escape(currentId)}"]`
      );
      if (link) {
        setReach(link.offsetTop + link.offsetHeight);
      }
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(rail);
    return () => observer.disconnect();
  }, [railRef, currentId]);

  return reach;
};

/** Small spaced caps in the mono face, like the footer colophon. */
const labelClass =
  "text-muted-fg font-mono text-xs/5 tracking-[0.08em] uppercase";

/** A click that follows the link in this tab. Modified clicks keep their own meaning. */
const MODIFIER_KEYS = ["metaKey", "ctrlKey", "shiftKey", "altKey"] as const;

const isPlainClick = (event: React.MouseEvent) =>
  event.button === 0 && !MODIFIER_KEYS.some((key) => event[key]);

/**
 * Glides to a section instead of the native jump, then does what the jump
 * would: puts the hash in the URL and history, and moves focus to the heading
 * so the next Tab starts from there. `scrollIntoView` keeps the heading's
 * scroll margin. Returns `false` when the heading is missing, so the link
 * can fall back to the native jump.
 */
const scrollToSection = (id: string) => {
  const heading = document.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
  if (!heading) {
    return false;
  }
  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  heading.scrollIntoView({
    behavior: reduceMotion ? "instant" : "smooth",
    block: "start",
  });
  window.history.pushState(null, "", `#${id}`);
  if (!heading.hasAttribute("tabindex")) {
    heading.setAttribute("tabindex", "-1");
    heading.addEventListener(
      "blur",
      () => heading.removeAttribute("tabindex"),
      { once: true }
    );
  }
  heading.focus({ preventScroll: true });
  return true;
};

interface OutlineLinksProps {
  entries: OutlineEntry[];
  currentId: string | undefined;
  onPick: (id: string) => void;
  className?: string;
  linkClassName: string;
}

const OutlineLinks = ({
  entries,
  currentId,
  onPick,
  className,
  linkClassName,
}: OutlineLinksProps) => (
  // `role="list"`: Safari drops list semantics from a list without markers.
  // oxlint-disable-next-line jsx-a11y/no-redundant-roles
  <ol role="list" className={className}>
    {entries.map((entry) => (
      <li key={entry.id}>
        <a
          href={`#${entry.id}`}
          data-outline-id={entry.id}
          aria-current={entry.id === currentId ? "location" : undefined}
          onClick={(event) => {
            if (isPlainClick(event) && scrollToSection(entry.id)) {
              event.preventDefault();
            }
            onPick(entry.id);
          }}
          className={twJoin(
            "text-muted-fg hover:text-fg aria-[current=location]:text-fg block rounded-sm text-pretty transition-colors duration-150 ease-out motion-reduce:transition-none",
            "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2 forced-colors:focus-visible:outline-[Highlight]",
            "forced-colors:aria-[current=location]:underline",
            linkClassName,
            entry.level === 3 && "ms-3"
          )}
        >
          {entry.text}
        </a>
      </li>
    ))}
  </ol>
);

/**
 * The Post Outline of a Post Detail: its sections, with the one the reader is
 * in marked. From `lg` it stands in the right column and stays in view; a 1px
 * Helm Teal trace fills the rail down to the current section, so its length
 * is how far the reader has come. Below `lg` it folds into a disclosure above
 * the Post Document. Native `<details>` and plain links, so both work with no
 * script.
 */
export const PostOutline = ({
  entries,
  className,
}: {
  entries: OutlineEntry[];
  className?: string;
}) => {
  const t = useTranslations();
  const labelId = useId();
  const ids = entries.map((entry) => entry.id);
  const { currentId, pick } = useCurrentSection(ids);
  const railRef = useRef<HTMLDivElement>(null);
  const reach = useTraceReach(railRef, currentId);

  return (
    <div className={className}>
      <details className="group border-border border-y lg:hidden">
        <summary
          className={twJoin(
            "flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 [&::-webkit-details-marker]:hidden",
            "focus-visible:outline-ring outline-0 focus-visible:outline-2 focus-visible:outline-offset-2",
            labelClass
          )}
        >
          {t("postOutline")}
          <span
            aria-hidden="true"
            className="text-muted-fg relative flex size-6 shrink-0 items-center justify-center"
          >
            <span className="absolute h-[1.5px] w-2.5 rotate-90 bg-current transition-transform duration-300 group-open:rotate-0 motion-reduce:transition-none" />
            <span className="absolute h-[1.5px] w-2.5 bg-current" />
          </span>
        </summary>
        <nav aria-label={t("postOutline")} className="pb-4">
          <OutlineLinks
            entries={entries}
            currentId={currentId}
            onPick={pick}
            linkClassName="py-2 text-base/6"
          />
        </nav>
      </details>

      <nav
        aria-labelledby={labelId}
        className="sticky top-24 hidden max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain lg:block"
      >
        <p id={labelId} className={labelClass}>
          {t("postOutline")}
        </p>
        <div
          ref={railRef}
          className="relative mt-4"
          // SAFETY: `CSSProperties` has no index for custom properties; the
          // one key is a CSS custom property, which React sets as written.
          style={{ "--outline-reach": `${reach ?? 0}px` } as CSSProperties}
        >
          <span
            aria-hidden="true"
            className="bg-muted-fg/30 pointer-events-none absolute inset-y-0 start-0 w-px"
          />
          <span
            aria-hidden="true"
            className={twJoin(
              "from-primary/45 to-primary pointer-events-none absolute start-0 top-0 h-(--outline-reach) w-px bg-linear-to-b forced-colors:hidden",
              "transition-[height] duration-[360ms] ease-[cubic-bezier(0.25,1,0.5,1)] motion-reduce:transition-none",
              reach === null && "opacity-0"
            )}
          />
          <OutlineLinks
            entries={entries}
            currentId={currentId}
            onPick={pick}
            linkClassName="py-1 ps-4 text-sm/6"
          />
        </div>
      </nav>
    </div>
  );
};
