import type { useTranslations } from "next-intl";

import type { ChartConfig } from "@/core/components/ui/chart";

/**
 * Deterministic sample data shared across data-driven showcases. Hand-written
 * constants (no faker) so the catalog renders identically on every reload,
 * which keeps it useful for eyeballing visual regressions.
 *
 * User-facing labels go through next-intl via the `t` factories below.
 */

type Translate = ReturnType<typeof useTranslations>;

const createRevenueData = (t: Translate) => [
  { month: t("catalogShowcaseJan"), Revenue: 4200, Expenses: 2400 },
  { month: t("catalogShowcaseFeb"), Revenue: 4600, Expenses: 2210 },
  { month: t("catalogShowcaseMar"), Revenue: 5100, Expenses: 2290 },
  { month: t("catalogShowcaseApr"), Revenue: 4780, Expenses: 2000 },
  { month: t("catalogShowcaseMay"), Revenue: 5890, Expenses: 2181 },
  { month: t("catalogShowcaseJun"), Revenue: 6390, Expenses: 2500 },
  { month: t("catalogShowcaseJul"), Revenue: 7490, Expenses: 2100 },
];

const createRevenueConfig = (t: Translate) =>
  ({
    Revenue: { label: t("catalogShowcaseRevenue") },
    Expenses: { label: t("catalogShowcaseExpenses") },
  }) satisfies ChartConfig;

const createShareData = (t: Translate) => [
  { name: "Chrome", value: 275 },
  { name: "Safari", value: 200 },
  { name: "Firefox", value: 187 },
  { name: "Edge", value: 173 },
  { name: t("catalogShowcaseOther"), value: 90 },
];

/** HSL so hue-channel color widgets don't throw (`Unknown color channel: hue` on RGB hex). */
const brandHsl = "hsl(216, 98%, 52%)";

const createShareConfig = (t: Translate) =>
  ({
    Chrome: { label: "Chrome" },
    Safari: { label: "Safari" },
    Firefox: { label: "Firefox" },
    Edge: { label: "Edge" },
    Other: { label: t("catalogShowcaseOther") },
  }) satisfies ChartConfig;

export interface DemoUser {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "Editor" | "Viewer";
  status: "Active" | "Invited" | "Suspended";
}

const demoUsers: DemoUser[] = [
  {
    id: 1,
    name: "Ava Thompson",
    email: "ava@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Liam Chen",
    email: "liam@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Noah Patel",
    email: "noah@example.com",
    role: "Viewer",
    status: "Invited",
  },
  {
    id: 4,
    name: "Mia Rodriguez",
    email: "mia@example.com",
    role: "Editor",
    status: "Suspended",
  },
];

export {
  brandHsl,
  createRevenueConfig,
  createRevenueData,
  createShareConfig,
  createShareData,
  demoUsers,
};
