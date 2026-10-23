import { Link, type LinkProps } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useI18n } from "@/i18n";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "outline-light" | "accent" | "ink";

const base =
  "group inline-flex min-h-12 items-center justify-center gap-3 rounded-sm px-6 text-[0.9rem] font-semibold tracking-[-0.005em] transition-[background-color,color,border-color] duration-300";
const variants: Record<Variant, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-ink-foreground",
  outline: "border border-ink-border text-ink-foreground hover:border-primary hover:text-primary",
  "outline-light":
    "border border-paper-foreground/20 text-paper-foreground hover:border-paper-foreground",
  /** The light division pages' accent colour (see LightDivisionPage). */
  accent: "bg-accent text-ink hover:bg-accent-deep hover:text-white",
  ink: "bg-ink text-ink-foreground hover:bg-ink-2",
};

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...link
}: LinkProps & { variant?: Variant; className?: string; children: ReactNode }) {
  return (
    <Link {...link} className={cn(base, variants[variant], className)}>
      {children}
      <span aria-hidden className="arrow-nudge">
        →
      </span>
    </Link>
  );
}

export function ExternalButton({
  href,
  variant = "outline",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: ReactNode;
}) {
  const { t } = useI18n();
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener"
      className={cn(base, variants[variant], className)}
    >
      {children}
      <span aria-hidden className="arrow-nudge arrow-nudge-diag">
        ↗
      </span>
      <span className="sr-only">({t.footer.external})</span>
    </a>
  );
}
