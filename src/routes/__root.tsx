import {
  HeadContent,
  Link,
  Outlet,
  Scripts,
  createRootRoute,
  useLocation,
  useRouter,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { getMessages, localeParam, splitLocalePath } from "@/i18n";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { name: "theme-color", content: "#0c1828" },
      { name: "author", content: "WDF" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap",
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
    ],
    // Flags JS support before paint so scroll reveals never hide content for no-JS visitors.
    scripts: [{ children: "document.documentElement.classList.add('js')" }],
  }),
  shellComponent: RootShell,
  component: Outlet,
  notFoundComponent: NotFound,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const { locale } = splitLocalePath(pathname);
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function NotFound() {
  const { pathname } = useLocation();
  const { locale } = splitLocalePath(pathname);
  const t = getMessages(locale);
  return (
    <main className="flex min-h-svh items-center bg-ink text-ink-foreground">
      <title>{t.meta.notFound.title}</title>
      <meta name="robots" content="noindex" />
      <div className="container-wdf">
        <p className="label-mono text-primary">404</p>
        <h1 className="display mt-6 text-[clamp(2.5rem,7vw,5rem)]">{t.notFound.title}</h1>
        <p className="mt-6 max-w-md text-lg text-ink-muted">{t.notFound.body}</p>
        <Link
          to="/{-$locale}"
          params={{ locale: localeParam(locale) }}
          className="label-mono mt-10 inline-flex items-center gap-2 hover:text-primary"
        >
          <span aria-hidden>←</span> {t.notFound.back}
        </Link>
      </div>
    </main>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  return (
    <main className="flex min-h-svh items-center bg-ink text-ink-foreground">
      <div className="container-wdf">
        <h1 className="display text-4xl">This page didn't load</h1>
        <p className="mt-4 text-ink-muted">Something went wrong. Please try again.</p>
        <button
          type="button"
          onClick={() => {
            router.invalidate();
            reset();
          }}
          className="label-mono mt-8 rounded-sm border border-primary px-5 py-3 text-primary hover:bg-primary hover:text-primary-foreground"
        >
          Try again
        </button>
      </div>
    </main>
  );
}
