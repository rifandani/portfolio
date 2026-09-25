import { twMerge } from "tailwind-merge";

import type { ContainerProps } from "@/core/components/ui/container";
import { Container } from "@/core/components/ui/container";

/**
 * Public-site column. The kit `Container` opens to `xl` (80rem) for dense app
 * chrome; the Public Site is one text-led column, so its surfaces cap
 * at `lg` (64rem) — wide enough that desktop no longer reads as a narrow strip,
 * still short of the `xl` width that strands a row's meta from its title.
 * Below the cap the column is fluid, so mobile is unchanged.
 * Header, page content, and footer share it so the topbar aligns with the content.
 */
export const SiteContainer = ({ className, ...props }: ContainerProps) => (
  <Container
    className={twMerge(
      "[--container-breakpoint:var(--breakpoint-lg)]",
      className
    )}
    {...props}
  />
);
