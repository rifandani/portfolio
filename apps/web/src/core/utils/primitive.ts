"use client";

import { cn } from "cn";
import type { ClassNameValue } from "cn";
import { composeRenderProps } from "react-aria-components/composeRenderProps";

export const composeTailwindRenderProps = <T>(
  className: string | ((v: T) => string) | undefined,
  tailwind: ClassNameValue
): string | ((v: T) => string) =>
  composeRenderProps(className, (_className) => cn(tailwind, _className));
type Render<T> = string | ((v: T) => string) | undefined;
type CxArgs<T> =
  | [...ClassNameValue[], Render<T>]
  | [[...ClassNameValue[], Render<T>]];
export const cx = <T = unknown>(
  ...args: CxArgs<T>
): string | ((v: T) => string) => {
  let resolvedArgs = args;
  if (args.length === 1 && Array.isArray(args[0])) {
    // SAFETY: the single-array overload of `CxArgs` wraps exactly the variadic
    // form, so unwrapping it yields the same tuple.
    resolvedArgs = args[0] as [...ClassNameValue[], Render<T>];
  }
  // SAFETY: `CxArgs` puts the render prop last, so this pop is that element.
  const className = resolvedArgs.pop() as Render<T>;
  // SAFETY: with the render prop popped, only class-name values remain.
  const tailwinds = resolvedArgs as ClassNameValue[];
  const fixed = cn(...tailwinds);
  return composeRenderProps(className, (merged) => cn(fixed, merged));
};
