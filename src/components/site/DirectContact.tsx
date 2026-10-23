import type { DivisionContact } from "@/lib/site";
import { cn } from "@/lib/utils";

const tones = {
  dark: {
    label: "text-ink-muted",
    link: "border-ink-border hover:border-primary hover:text-primary",
  },
  accent: { label: "text-ink/70", link: "border-ink/30 hover:border-ink" },
  /** On navy pages with the sand detail colour (3PL). */
  sand: {
    label: "text-ink-muted",
    link: "border-ink-border hover:border-sand hover:text-sand",
  },
} as const;

/** A division's approved direct contact: name, phone (tap to call) and optional email. */
export function DirectContact({
  label,
  contact,
  tone = "dark",
  className,
}: {
  label: string;
  contact: DivisionContact;
  tone?: keyof typeof tones;
  className?: string;
}) {
  const t = tones[tone];
  const link = cn("border-b pb-0.5 transition-colors", t.link);
  return (
    <div className={className}>
      <p className={cn("label-mono", t.label)}>{label}</p>
      <p className="mt-3 text-lg font-semibold">{contact.name}</p>
      <div className="mt-1 flex flex-col items-start gap-1.5">
        <a href={`tel:${contact.tel}`} className={link}>
          {contact.phone}
        </a>
        {contact.email && (
          <a href={`mailto:${contact.email}`} className={cn("break-all", link)}>
            {contact.email}
          </a>
        )}
      </div>
    </div>
  );
}
