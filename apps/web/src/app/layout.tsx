import type { Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { connection } from "next/server";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { IconSprite } from "@/core/components/icon-sprite";
import { AppProviders } from "@/core/providers/providers.client";
import { fontVariables } from "@/core/styles/fonts";
import { createMetadata } from "@/core/utils/seo";

import "@/core/styles/globals.css";

export const metadata = createMetadata({
  title: "Layout",
  description: "Bulletproof Next.js 15 Template",
});

export const generateViewport = (): Viewport => ({
  colorScheme: "light dark",
  themeColor: [
    // Kept in step with `--canvas` in globals.css so the browser chrome
    // matches the paper canvas instead of flashing pure white.
    { media: "(prefers-color-scheme: light)", color: "#fbfaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#100e0c" },
  ],
});

const RootLayout = async ({ children }: LayoutProps<"/">) => {
  // Opt-out of static generation for every page so the CSP nonce can be applied
  const [, locale, messages] = await Promise.all([
    connection(),
    getLocale(),
    getMessages(),
  ]);

  return (
    // suppressHydrationWarning for next-themes
    <html lang={locale} suppressHydrationWarning>
      <head>
        <meta name="msapplication-TileColor" content="#fbfaf7" />
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <link
          rel="apple-touch-icon"
          href="/apple-touch-icon-180x180.png"
          sizes="180x180"
        />
      </head>

      <body className={`${fontVariables} min-h-svh font-sans antialiased`}>
        <IconSprite />

        <NextIntlClientProvider messages={messages}>
          <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
            <NuqsAdapter>
              <AppProviders locale={locale}>{children}</AppProviders>
            </NuqsAdapter>
          </NextThemesProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
};
export default RootLayout;
