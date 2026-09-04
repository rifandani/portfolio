"use client";

import { ArrowPathIcon } from "@heroicons/react/16/solid";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { dash } from "radashi";
import { useState } from "react";
import { SwitchButton, SwitchField } from "react-aria-components/Switch";
import { twJoin } from "tailwind-merge";

import { Button } from "@/core/components/ui/button";
import { resolveFeatureEnabled } from "@/core/feature-flags/is-enabled";
import {
  featureFlagIds,
  featureFlagRegistry,
} from "@/core/feature-flags/registry";
import type {
  FeatureFlagDefinition,
  FeatureFlagId,
  MessageKey,
} from "@/core/feature-flags/registry";
import {
  featureFlagStoreName,
  useFeatureFlagStore,
} from "@/core/feature-flags/store";

const applyFlagChange = (mutate: () => void, refresh: () => void): void => {
  mutate();
  refresh();
};

/** Subsequence match — `/ fuzzy filter` in the panel. */
const fuzzyMatch = (query: string, ...haystacks: string[]): boolean => {
  const q = query.trim().toLowerCase();
  if (q.length === 0) {
    return true;
  }

  return haystacks.some((haystack) => {
    const t = haystack.toLowerCase();
    let i = 0;
    for (const char of t) {
      if (char === q[i]) {
        i += 1;
      }
      if (i === q.length) {
        return true;
      }
    }
    return false;
  });
};

const groupBySection = (
  flags: readonly FeatureFlagDefinition[]
): readonly (readonly [MessageKey, FeatureFlagDefinition[]])[] => {
  const groups = new Map<MessageKey, FeatureFlagDefinition[]>();
  for (const flag of flags) {
    const list = groups.get(flag.sectionKey) ?? [];
    list.push(flag);
    groups.set(flag.sectionKey, list);
  }
  return [...groups.entries()];
};

const statusDotClass = (isOverridden: boolean, enabled: boolean): string => {
  if (isOverridden) {
    return "bg-blue-500";
  }
  if (enabled) {
    return "bg-muted-fg";
  }
  return "bg-muted-fg/40";
};

const OverrideRail = ({ visible }: { visible: boolean }) => {
  if (!visible) {
    return null;
  }
  return (
    <span
      aria-hidden="true"
      className="absolute inset-y-0 left-0 w-0.5 bg-blue-500"
    />
  );
};

const OverrideResetButton = ({
  displayId,
  flagId,
  visible,
  refresh,
}: {
  displayId: string;
  flagId: FeatureFlagId;
  visible: boolean;
  refresh: () => void;
}) => {
  const t = useTranslations();
  const resetOverride = useFeatureFlagStore((s) => s.resetOverride);

  if (!visible) {
    return null;
  }

  return (
    <Button
      intent="plain"
      size="sq-xs"
      aria-label={t("featureFlagResetOne", { id: displayId })}
      className="text-muted-fg size-6 sm:size-6"
      onPress={() => {
        applyFlagChange(() => {
          resetOverride(flagId);
        }, refresh);
      }}
    >
      <ArrowPathIcon className="size-3" />
    </Button>
  );
};

const rowClassName = (isOverridden: boolean, enabled: boolean): string =>
  twJoin(
    "group/row relative flex items-center gap-2 py-1.5 pr-2.5 pl-2.5",
    isOverridden && "bg-muted/50",
    !enabled && "text-muted-fg"
  );

const idClassName = (enabled: boolean): string =>
  twJoin("min-w-0 flex-1 truncate", enabled ? "text-fg" : "text-muted-fg");

const FlagSwitchIndicator = ({
  isFocusVisible,
  isSelected,
}: {
  isFocusVisible: boolean;
  isSelected: boolean;
}) => (
  <span
    data-slot="indicator"
    className={twJoin(
      "relative inline-flex h-4 w-7 items-center rounded-full p-0.5 transition-colors",
      isFocusVisible && "ring-ring/50 ring-offset-bg ring-2 ring-offset-1",
      isSelected ? "bg-fg" : "bg-muted-fg/25"
    )}
  >
    <span
      aria-hidden="true"
      className={twJoin(
        "bg-bg size-3 rounded-full shadow-sm transition-transform",
        isSelected && "translate-x-3"
      )}
    />
  </span>
);

const FlagSwitch = ({
  flagId,
  label,
  enabled,
  refresh,
}: {
  flagId: FeatureFlagId;
  label: string;
  enabled: boolean;
  refresh: () => void;
}) => {
  const setOverride = useFeatureFlagStore((s) => s.setOverride);

  return (
    <SwitchField
      aria-label={label}
      isSelected={enabled}
      onChange={(isSelected) => {
        applyFlagChange(() => {
          setOverride(flagId, isSelected);
        }, refresh);
      }}
    >
      <SwitchButton className="shrink-0 outline-none">
        {(values) => (
          <FlagSwitchIndicator
            isFocusVisible={values.isFocusVisible}
            isSelected={values.isSelected}
          />
        )}
      </SwitchButton>
    </SwitchField>
  );
};

const FeatureFlagRow = ({
  flag,
  refresh,
}: {
  flag: FeatureFlagDefinition;
  refresh: () => void;
}) => {
  const t = useTranslations();
  const { id, labelKey } = flag;
  const label = t(labelKey);
  const override = useFeatureFlagStore((s) => s.overrides[id]);
  const isOverridden = override !== undefined;
  const enabled = resolveFeatureEnabled({
    isDev: process.env.NODE_ENV === "development",
    override,
    defaultEnabled: flag.defaultEnabled,
  });
  const displayId = dash(id);

  return (
    <li className={rowClassName(isOverridden, enabled)}>
      <OverrideRail visible={isOverridden} />

      <span
        aria-hidden="true"
        className={twJoin(
          "size-1.5 shrink-0 rounded-full",
          statusDotClass(isOverridden, enabled)
        )}
      />

      <span className={idClassName(enabled)}>{displayId}</span>

      <OverrideResetButton
        displayId={displayId}
        flagId={id}
        visible={isOverridden}
        refresh={refresh}
      />

      <FlagSwitch
        flagId={id}
        label={label}
        enabled={enabled}
        refresh={refresh}
      />
    </li>
  );
};

export const FeatureFlagsPanel = () => {
  const t = useTranslations();
  const router = useRouter();
  const refresh = () => {
    router.refresh();
  };
  const overrideCount = useFeatureFlagStore(
    (s) => Object.keys(s.overrides).length
  );
  const resetAllOverrides = useFeatureFlagStore((s) => s.resetAllOverrides);

  const [query, setQuery] = useState("");

  const filteredFlags = featureFlagRegistry.filter((flag) =>
    fuzzyMatch(
      query,
      flag.id,
      dash(flag.id),
      t(flag.labelKey),
      t(flag.sectionKey)
    )
  );
  const sections = groupBySection(filteredFlags);

  // TanStack `pluginsTabContent` forces `width/height: 100%` on `& > *` and
  // `& > * > *`. One extra wrapper keeps header/filter/list from each stretching.
  return (
    <div
      data-feature-flag-store={featureFlagStoreName}
      data-feature-flag-count={featureFlagIds.length}
    >
      <div className="text-fg flex flex-col overflow-hidden font-mono text-xs">
        <div className="flex shrink-0 items-center justify-between gap-2 px-2.5 py-2">
          <span className="font-sans text-sm font-semibold lowercase">
            {t("featureFlagsHeading")}
          </span>
          <Button
            intent="outline"
            size="xs"
            className="font-sans"
            isDisabled={overrideCount === 0}
            onPress={() => {
              applyFlagChange(() => {
                resetAllOverrides();
              }, refresh);
            }}
          >
            {t("featureFlagsResetAll", { count: overrideCount })}
          </Button>
        </div>

        <label className="border-border/60 text-muted-fg flex shrink-0 items-center gap-1.5 border-y px-2.5 py-1.5">
          <span aria-hidden="true" className="text-muted-fg/70">
            /
          </span>
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
            }}
            placeholder={t("featureFlagsFuzzyFilter")}
            aria-label={t("featureFlagsFuzzyFilterAria")}
            className="text-fg placeholder:text-muted-fg/70 min-w-0 flex-1 bg-transparent outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          <span className="text-muted-fg shrink-0 tabular-nums">
            {filteredFlags.length}/{featureFlagIds.length}
          </span>
        </label>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          {sections.length === 0 ? (
            <p className="text-muted-fg px-2.5 py-4 text-center font-sans">
              {t("featureFlagsNoMatch")}
            </p>
          ) : (
            sections.map(([sectionKey, flags]) => (
              <section key={sectionKey}>
                <h3 className="bg-bg text-muted-fg sticky top-0 z-10 px-2.5 py-1 font-sans text-[10px] font-medium tracking-wider uppercase">
                  {t(flags[0]?.sectionKey ?? sectionKey)}
                  <span className="ms-1 tabular-nums opacity-70">
                    {flags.length}
                  </span>
                </h3>
                <ul className="m-0 list-none p-0">
                  {flags.map((flag) => (
                    <FeatureFlagRow
                      key={flag.id}
                      flag={flag}
                      refresh={refresh}
                    />
                  ))}
                </ul>
              </section>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
