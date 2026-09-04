import type { ComponentType } from "react";

import type { MessageKey } from "@/core/feature-flags/registry";

/** One component's place in the Component Catalog. */
export interface ComponentEntry {
  /** Slug used for the section anchor id and the URL hash. */
  id: string;
  /** Translation Key for the nav item and section heading. */
  nameKey: MessageKey;
  Showcase: ComponentType;
}

/** A named grouping of Component Entries that drives nav grouping and page order. */
export interface Category {
  id: string;
  /** Translation Key for the category heading. */
  nameKey: MessageKey;
  entries: ComponentEntry[];
}
