"use client";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { Agentation } from "agentation";

import { FeatureFlagsPanel } from "@/core/feature-flags/panel";
import { getQueryClient } from "@/core/providers/query/client";

// E2E runs must not mount devtools: their overlays intercept pointer events.
const isE2E = process.env.NEXT_PUBLIC_E2E === "true";
const isDev = process.env.NODE_ENV === "development";

export const Devtools = () => {
  const queryClient = getQueryClient();

  if (isE2E) {
    return null;
  }

  const plugins = [
    {
      name: "TanStack Query",
      render: <ReactQueryDevtoolsPanel client={queryClient} />,
    },
    {
      name: "TanStack Form",
      render: <FormDevtoolsPanel />,
    },
    {
      name: "Feature Flags",
      render: <FeatureFlagsPanel />,
    },
  ];

  return (
    <>
      <TanStackDevtools
        config={{
          position: "bottom-left",
        }}
        plugins={plugins}
      />
      {/* Ternary, not `&&`: a falsy left side renders as text rather than nothing. */}
      {isDev ? <Agentation /> : null}
    </>
  );
};
