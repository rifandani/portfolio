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
  // Production floor: never honor an ON override outside DEV.
  if (!isDev) {
    return false;
  }
  if (override !== undefined) {
    return override;
  }
  return defaultEnabled;
};
