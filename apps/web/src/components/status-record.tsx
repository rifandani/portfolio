import type { ReactNode } from "react";

/**
 * The Status Screen's line of record: the status in Warm Graphite, then what
 * it is about ("404 · /posts/x", "500 · Reference …").
 */
export const StatusRecord = ({
  status,
  children,
}: {
  status: string;
  children: ReactNode;
}) => (
  <>
    <span className="text-fg tabular-nums">{status}</span>
    <span aria-hidden="true" className="px-2 opacity-50">
      ·
    </span>
    {children}
  </>
);
