import type messages from "../../../messages/en.json";

/** Flat Translation Key into `apps/web/messages/*.json`. */
export type MessageKey = keyof typeof messages & string;

export const featureFlagIds = ["componentCatalog"] as const;

export type FeatureFlagId = (typeof featureFlagIds)[number];

export interface FeatureFlagDefinition {
  id: FeatureFlagId;
  /** Translation Key for the Feature Flags panel label. */
  labelKey: MessageKey;
  /** Translation Key for the sticky group heading in the panel. */
  sectionKey: MessageKey;
  /** Default when running in development and no override is stored. */
  defaultEnabled: boolean;
}

export const featureFlagRegistry: readonly FeatureFlagDefinition[] = [
  {
    id: "componentCatalog",
    labelKey: "featureFlagComponentCatalog",
    sectionKey: "featureFlagSectionCatalog",
    defaultEnabled: true,
  },
];

export const getFeatureFlagDefinition = (
  id: FeatureFlagId
): FeatureFlagDefinition => {
  const def = featureFlagRegistry.find((flag) => flag.id === id);
  if (!def) {
    throw new Error(`Unknown Feature Flag: ${id}`);
  }
  return def;
};
