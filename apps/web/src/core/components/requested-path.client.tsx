"use client";

import { usePathname } from "next/navigation";

import { StatusRecord } from "@/core/components/status-record";

/**
 * The status and the path that failed, as one line of record: "404 · /posts/x".
 * Client-side because `not-found` gets no request path on the server.
 */
export const RequestedPath = ({ status }: { status: string }) => {
  const pathname = usePathname();
  return <StatusRecord status={status}>{pathname}</StatusRecord>;
};
