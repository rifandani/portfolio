"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import type { ReactNode } from "react";

import { Loader } from "@/core/components/ui/loader";
import { AppAriaProvider } from "@/core/providers/aria/provider.client";
import { AppEvlogProvider } from "@/core/providers/evlog.client";
import { AppQueryProvider } from "@/core/providers/query/provider.client";
import { AppToastProvider } from "@/core/providers/toast/provider.client";
import { WebVitals } from "@/core/providers/web-vitals.client";

/**
 * Devtools carry the TanStack query/form panels and `agentation` — several
 * hundred KB of client JS that a production visitor never opens. A static
 * import keeps all of it in the shared bundle, so the panel is behind both a
 * build-time constant (the branch minifies away in production) and
 * `next/dynamic` (the chunk is requested only once the branch is live).
 */
const isDev = process.env.NODE_ENV === "development";

const Devtools = isDev
  ? dynamic(async () => {
      const mod = await import("@/core/providers/devtools.client");
      return mod.Devtools;
    })
  : () => null;

export const AppProviders = ({
  children,
  locale,
}: {
  children: ReactNode;
  locale: string;
}) => (
  <>
    <AppEvlogProvider>
      <AppAriaProvider locale={locale}>
        <AppToastProvider>
          <AppQueryProvider>
            <Suspense fallback={<Loader className="size-4.5" variant="spin" />}>
              {children}

              <Devtools />
            </Suspense>
          </AppQueryProvider>
        </AppToastProvider>
      </AppAriaProvider>
    </AppEvlogProvider>

    <WebVitals />
  </>
);
