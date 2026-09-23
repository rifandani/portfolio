"use client";

import { CheckIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { twJoin, twMerge } from "tailwind-merge";

import { Button } from "@/core/components/ui/button";
import { useClipboard } from "@/core/hooks/use-clipboard";

/** Both states share one grid cell, so the button keeps its width. */
const STACK = "grid *:col-start-1 *:row-start-1";

const FADE =
  "transition-[opacity,scale] duration-180 ease-out motion-reduce:transition-none";

const ICON = "size-4.5 sm:size-4";

const iconFade = (isShown: boolean) =>
  twJoin(FADE, isShown ? "scale-100 opacity-100" : "scale-75 opacity-0");

const labelFade = (isShown: boolean) =>
  twJoin(FADE, isShown ? "opacity-100" : "opacity-0");

/**
 * Copies the Post Markdown. The copied state is a status, so it takes the
 * success tone, not a brand color. The name stays "Copy page"; the status
 * region tells a screen reader that the copy happened.
 */
export const CopyPageButton = ({ markdown }: { markdown: string }) => {
  const t = useTranslations();
  const { copied, copy } = useClipboard();

  return (
    <>
      <Button
        intent="outline"
        size="sm"
        className={twMerge(
          "transition-[border-color] duration-180 motion-reduce:transition-none",
          copied && "border-success/60"
        )}
        onPress={() => {
          void copy(markdown);
        }}
      >
        <span aria-hidden="true" className={STACK}>
          <ClipboardIcon
            className={twJoin(ICON, "text-muted-fg", iconFade(!copied))}
          />
          <CheckIcon
            className={twJoin(ICON, "text-success-subtle-fg", iconFade(copied))}
          />
        </span>
        <span className={STACK}>
          <span className={labelFade(!copied)}>{t("postCopyPage")}</span>
          <span aria-hidden="true" className={labelFade(copied)}>
            {t("postCopied")}
          </span>
        </span>
      </Button>
      <output className="sr-only">{copied ? t("postCopied") : ""}</output>
    </>
  );
};
