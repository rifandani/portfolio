"use client";

import { CheckIcon } from "@heroicons/react/24/outline";
import type { ComponentType, SVGProps } from "react";
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
 * The left button of the Page Actions and the Share Actions: it copies `value`
 * and shows `copiedLabel` for a short time. The copied state is a status, so it
 * takes the success tone, not a brand color. The accessible name stays `label`;
 * the status region reads `status` to a screen reader when the copy happens.
 */
export const CopyButton = ({
  value,
  icon: Icon,
  label,
  copiedLabel,
  status = copiedLabel,
}: {
  value: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  label: string;
  copiedLabel: string;
  status?: string;
}) => {
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
          void copy(value);
        }}
      >
        <span aria-hidden="true" className={STACK}>
          <Icon className={twJoin(ICON, "text-muted-fg", iconFade(!copied))} />
          <CheckIcon
            className={twJoin(ICON, "text-success-subtle-fg", iconFade(copied))}
          />
        </span>
        <span className={STACK}>
          <span className={labelFade(!copied)}>{label}</span>
          <span aria-hidden="true" className={labelFade(copied)}>
            {copiedLabel}
          </span>
        </span>
      </Button>
      <output className="sr-only">{copied ? status : ""}</output>
    </>
  );
};
