"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { HiOutlineArrowUpRight, HiOutlineWindow } from "react-icons/hi2";
import { twMerge } from "tailwind-merge";

import { SpriteIcon } from "@/core/components/icon-sprite";
import { buttonStyles } from "@/core/components/ui/button";
import { Link } from "@/core/components/ui/link";
import type { ProjectLink } from "@/project/utils/project-links";

const icons = {
  demo: <HiOutlineWindow aria-hidden="true" data-slot="icon" />,
  github: <SpriteIcon id="icon-github" />,
} satisfies Record<ProjectLink["kind"], ReactNode>;

const labelKeys = {
  demo: "projectOpenDemo",
  github: "projectViewSource",
} as const satisfies Record<ProjectLink["kind"], string>;

/**
 * The Project Links in the header, in button form. The first link is the one
 * primary fill on the page: it is what a visitor came to the Project for, so
 * Helm Teal earns its place here. A second link takes the outline form. Each
 * opens a new tab; the arrow says so to the eye and steps the way it points on
 * hover, and the visually hidden suffix says so to a screen reader.
 *
 * Two labels do not fit on one row of a phone, so below `sm` the buttons stack
 * at full width, the label at the start and the arrow at the end, as the "View
 * CV" link does in its column.
 */
export const ProjectLinkButtons = ({
  links,
  className,
}: {
  links: ProjectLink[];
  className?: string;
}) => {
  const t = useTranslations();
  return (
    <ul
      aria-label={t("projectLinks")}
      className={twMerge(
        "grid gap-3 sm:flex sm:flex-wrap sm:items-center",
        className
      )}
    >
      {links.map((link, index) => (
        <li key={link.kind} className="flex">
          <Link
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            variant="plain"
            className={twMerge(
              buttonStyles({ intent: index === 0 ? "primary" : "outline" }),
              "group w-full sm:w-auto"
            )}
          >
            {icons[link.kind]}
            <span className="flex-1 text-start">{t(labelKeys[link.kind])}</span>
            <span className="sr-only">{t("opensInNewTab")}</span>
            <HiOutlineArrowUpRight
              aria-hidden="true"
              data-slot="icon"
              className="transition-[translate] duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
};
