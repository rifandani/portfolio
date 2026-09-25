"use client";

import { useTimeoutFn } from "@reactuses/core";
import { useState } from "react";

import { canWriteToClipboard } from "@/core/utils/dom";

const COPIED_RESET_MS = 2000;

/**
 * Writes text to the clipboard, adding a short-lived `copied` flag for UI
 * feedback. It only writes: `@reactuses/core`'s `useClipboard` reads the
 * clipboard on mount and on each window focus, which makes the browser ask a
 * visitor for clipboard permission they never needed to give.
 *
 * The flag resets itself after {@link COPIED_RESET_MS}; `useTimeoutFn` clears
 * the pending timer on unmount.
 *
 * @returns `copied` feedback flag and a `copy` function resolving to whether the write succeeded
 */
export const useClipboard = () => {
  const [copied, setCopied] = useState(false);
  const [, startResetTimer, stopResetTimer] = useTimeoutFn(
    () => setCopied(false),
    COPIED_RESET_MS,
    { immediate: false }
  );
  const fail = () => {
    stopResetTimer();
    setCopied(false);
    return false;
  };
  const copy = async (value: string) => {
    if (!canWriteToClipboard()) {
      return fail();
    }
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      startResetTimer();
      return true;
    } catch {
      return fail();
    }
  };
  return { copied, copy };
};
