"use client";

import { useEffect, useRef } from "react";
import type { ReactNode } from "react";

/**
 * The work rail's list, read by the pointer.
 *
 * Pointing at a role sends a Helm Teal bead — the same mark as the current
 * role's node — down the rail from the first node to that role's node, and
 * lights the rail behind it. The lit length is how far back in time the reader
 * is looking. Leaving the list retracts it to the first node.
 *
 * A work entry is not a link (The Static-Work Rule), so the row itself gets no
 * wash and no pointer cursor: the response lives on the rail, which already
 * speaks chronology.
 *
 * Everything visual lives in the `work-rail` rules. This only measures where
 * the nodes are and writes one number, `--rail-reach`, the distance in px from
 * the first node to the target node. That property is registered in CSS, so
 * the transition runs on the number itself, and the bead and the trace both
 * read it and cannot fall out of step.
 *
 * Nodes are measured on every row change, not cached, so a resized or
 * reflowed list never sends the bead to a stale position. Touch is ignored: a
 * tap on a static row is not a request to scrub it. Without script the bead
 * and the trace stay hidden and the rail reads as before.
 */
export const WorkRailList = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) {
      return;
    }

    let row: Element | null = null;

    const centre = (node: Element, box: DOMRect) => {
      const rect = node.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 - box.left,
        y: rect.top + rect.height / 2 - box.top,
      };
    };

    const aim = (target: Element) => {
      const first = root.querySelector("[data-rail-node]");
      const node = target.querySelector("[data-rail-node]");
      if (!first || !node) {
        return;
      }
      const box = root.getBoundingClientRect();
      const from = centre(first, box);
      const to = centre(node, box);
      root.style.setProperty("--rail-x", `${from.x}px`);
      root.style.setProperty("--rail-from", `${from.y}px`);
      root.style.setProperty("--rail-reach", String(to.y - from.y));
      root.dataset.scrub = "on";
    };

    const over = (event: PointerEvent) => {
      const target = railRowOf(event);
      if (!target || target === row) {
        return;
      }
      row = target;
      aim(target);
    };

    const release = () => {
      row = null;
      root.dataset.scrub = "off";
      root.style.setProperty("--rail-reach", "0");
    };

    root.addEventListener("pointerover", over);
    root.addEventListener("pointerleave", release);
    return () => {
      root.removeEventListener("pointerover", over);
      root.removeEventListener("pointerleave", release);
    };
  }, []);

  return (
    <div ref={ref} className="work-rail">
      <ul className={className}>{children}</ul>
      <span aria-hidden="true" className="work-rail-trace" />
      <span
        aria-hidden="true"
        className="work-rail-bead bg-primary ring-primary/20 ring-2"
      />
    </div>
  );
};
