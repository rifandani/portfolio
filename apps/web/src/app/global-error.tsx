"use client";

import { trace } from "@opentelemetry/api";
import { log } from "evlog/next/client";
import type { AbstractIntlMessages } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ErrorInfo, ReactNode } from "react";
import {
  Component,
  Suspense,
  use,
  useDeferredValue,
  useEffect,
  useSyncExternalStore,
} from "react";

import { ErrorScreen } from "@/core/components/error-screen.client";
import {
  TRACER_GLOBAL_ERROR,
  TRACER_GLOBAL_ERROR_ON_ERROR,
} from "@/core/constants/global";
import type { I18NLocale } from "@/core/constants/i18n";
import {
  I18N_COOKIE_NAME,
  I18N_DEFAULT_LOCALE,
  I18N_LOCALES,
} from "@/core/constants/i18n";
import { fontVariables } from "@/core/styles/fonts";
import { errorAttributesFromUnknown } from "@/core/utils/error-helper";
import { recordException } from "@/core/utils/telemetry";

import "@/core/styles/globals.css";

const tracer = trace.getTracer(TRACER_GLOBAL_ERROR);

/**
 * `global-error` replaces the root layout, so nothing the layout reads on the
 * server reaches it. The locale comes from the same cookie the request config
 * reads, and only a supported value is honored.
 */
const readLocale = (): I18NLocale => {
  const prefix = `${I18N_COOKIE_NAME}=`;
  const value = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix))
    ?.slice(prefix.length);
  return I18N_LOCALES.find((locale) => locale === value) ?? I18N_DEFAULT_LOCALE;
};

/**
 * The language toggle writes the cookie through a Server Action, which cannot
 * re-render this boundary. The Cookie Store API reports the change; where it
 * is missing, the new language shows after "Try again" or a reload.
 */
const subscribeLocale = (onChange: () => void) => {
  const store = globalThis.cookieStore;
  store?.addEventListener("change", onChange);
  return () => store?.removeEventListener("change", onChange);
};

const getServerLocale = () => I18N_DEFAULT_LOCALE;

/**
 * Messages load on demand, not with a static import: this component ships on
 * every page, and a visitor who never meets it should not pay for both
 * locales. One promise per locale, so `use` sees the same one every render.
 */
const messagesByLocale = new Map<I18NLocale, Promise<AbstractIntlMessages>>();

const loadMessages = (locale: I18NLocale) => {
  let messages = messagesByLocale.get(locale);
  if (!messages) {
    messages = (async () => {
      const mod: { default: AbstractIntlMessages } = await import(
        `../../messages/${locale}.json`
      );
      return mod.default;
    })();
    messagesByLocale.set(locale, messages);
  }
  return messages;
};

/**
 * Last line of defence: if the site chrome is what threw, render the Error
 * Screen without it rather than leave the visitor on a blank page.
 */
class ChromeBoundary extends Component<
  {
    children: ReactNode;
    fallback: ReactNode;
    onError: (error: Error, info: ErrorInfo) => void;
  },
  { failed: boolean }
> {
  constructor(props: ChromeBoundary["props"]) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  override componentDidCatch(error: Error, info: ErrorInfo) {
    this.props.onError(error, info);
  }

  override render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

const logChromeError = (error: Error, info: ErrorInfo) => {
  log.error({
    area: "app.globalError",
    phase: "render",
    summary: "Site chrome failed on global error page",
    componentStack: info.componentStack,
    ...errorAttributesFromUnknown(error),
  });
};

const LocalizedErrorScreen = ({
  locale,
  digest,
  retry,
}: {
  locale: I18NLocale;
  digest?: string;
  retry: () => void;
}) => {
  const messages = use(loadMessages(locale));
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ChromeBoundary
        onError={logChromeError}
        fallback={
          <ErrorScreen
            digest={digest}
            status="500"
            retry={retry}
            withChrome={false}
          />
        }
      >
        <ErrorScreen digest={digest} status="500" retry={retry} />
      </ChromeBoundary>
    </NextIntlClientProvider>
  );
};

/**
 * The root layout failed, so the response is a 500. The page is the same
 * Error Screen as `error`, with the layout's styles, fonts, theme, and
 * language brought in by hand.
 */
export default function GlobalError({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const liveLocale = useSyncExternalStore(
    subscribeLocale,
    readLocale,
    getServerLocale
  );
  // Deferred, so a locale switch keeps the current page on screen while the
  // other messages load, instead of suspending to a blank body.
  const locale = useDeferredValue(liveLocale);

  useEffect(() => {
    recordException({
      tracer,
      name: TRACER_GLOBAL_ERROR_ON_ERROR,
      error: {
        message: error.message,
        stack: error.stack,
        digest: error.digest,
      },
    });
    log.error({
      area: "app.globalError",
      phase: "render",
      summary: "Error on global error page",
      ...errorAttributesFromUnknown(error),
    });
  }, [error]);

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
        {/* Same theme setup as the root layout, which this file replaces. */}
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <Suspense>
            <LocalizedErrorScreen
              locale={locale}
              digest={error.digest}
              retry={retry}
            />
          </Suspense>
        </NextThemesProvider>
      </body>
    </html>
  );
}
