export interface ResolveFeatureEnabledInput {
  isDev: boolean;
  override: boolean | undefined;
  defaultEnabled: boolean;
}

/** Pure resolver — used by `isFeatureEnabled` and unit tests. */
export const resolveFeatureEnabled = ({
  isDev,
  override,
  defaultEnabled,
}: ResolveFeatureEnabledInput): boolean => {
  // Production uses the registry default. The current Master Design default
  // is enabled in every environment; browser overrides remain DEV-only.
  if (!isDev) {
    return defaultEnabled;
  }
  if (override !== undefined) {
    return override;
  }
  return defaultEnabled;
};
