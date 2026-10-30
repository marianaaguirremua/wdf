import { Link } from "@tanstack/react-router";
import type { CSSProperties, ReactNode } from "react";
import { localeParam, useI18n } from "@/i18n";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

// Each division card leads with a photo (public/media/divisions, all cut to 4:3 at 960 × 720)
// and keeps its accent colour in the top rule and the kicker text.

type DivisionProps = {
  index: number;
  /** Colour of the card's top rule. */
  accent: string;
  /** Darker shade of the accent for text on white (AA contrast). */
  accentText: string;
  name: string;
  kicker: string;
  body: string;
  /** Photo for the card, 4:3. Decorative: the division name follows it. */
  image: string;
  tags?: readonly string[];
  action: ReactNode;
};

function Division({
  index,
  accent,
  accentText,
  name,
  kicker,
  body,
  image,
  tags,
  action,
}: DivisionProps) {
  return (
    <Reveal
      as="article"
      delay={index * 90}
      className="division group/card relative flex cursor-pointer flex-col overflow-hidden rounded-md border border-paper-border bg-white transition-[border-color,box-shadow] duration-300 hover:border-paper-foreground/20 hover:shadow-[0_10px_30px_-12px_rgb(12_24_40/0.18)]"
    >
      <div
        style={{ "--accent": accent, "--accent-text": accentText } as CSSProperties}
        className="flex h-full flex-col"
      >
        <span aria-hidden className="block h-1 w-full bg-[var(--accent)]" />
        <div className="aspect-[4/3] shrink-0 overflow-hidden bg-iron">
          <img
            src={image}
            alt=""
            width={960}
            height={720}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover/card:scale-[1.03]"
          />
        </div>
        <div className="flex h-full flex-col p-6 md:p-7">
          <h3 className="heading text-2xl">{name}</h3>
          <p className="mt-2 text-[0.9375rem] font-medium text-[var(--accent-text)] xl:min-h-[2lh]">
            {kicker}
          </p>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-muted">{body}</p>
          {tags && (
            <ul className="mt-5 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-sm bg-paper px-2.5 py-1 text-xs text-paper-foreground/80"
                >
                  {tag}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-auto pt-7">{action}</div>
        </div>
      </div>
    </Reveal>
  );
}

// The link's ::after stretches over the whole card (the <article> is relative), so the entire
// card opens the division page while staying a single link for keyboard and screen readers.
const actionClass =
  "inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-[var(--accent-text)] after:absolute after:inset-0 after:content-[''] hover:underline group-hover/card:underline underline-offset-4";

/** On the Services page the block is the page itself: its own eyebrow and title, as the h1. */
export function Divisions({
  eyebrow,
  title,
  body,
  as = "h2",
}: {
  eyebrow?: string;
  title?: string;
  /** Optional paragraph under the title (Home uses the company introduction here). */
  body?: string;
  as?: "h1" | "h2";
}) {
  const { locale, t } = useI18n();
  const params = { locale: localeParam(locale) };
  const d = t.divisions;

  return (
    <section
      id="divisions"
      aria-labelledby="divisions-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div
        className={cn(
          "container-wdf py-20 md:py-24",
          as === "h1" && "pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4.5rem)]",
        )}
      >
        <div className="max-w-3xl">
          <Reveal as="p" className="text-sm font-semibold text-cyan-deep">
            {eyebrow ?? d.eyebrow}
          </Reveal>
          <Reveal
            as={as}
            delay={80}
            className={cn(
              "heading mt-3",
              as === "h1"
                ? "text-[clamp(2.25rem,4.2vw,3.5rem)]"
                : "text-[clamp(1.75rem,3vw,2.5rem)]",
            )}
          >
            <span id="divisions-title">{title ?? d.title}</span>
          </Reveal>
          {body && (
            <Reveal delay={160}>
              <p className="mt-5 text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg">
                {body}
              </p>
            </Reveal>
          )}
        </div>

        <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-2 xl:grid-cols-4">
          <Division
            index={0}
            accent="var(--teal)"
            accentText="var(--cyan-deep)"
            name={d.manufacturing.name}
            kicker={d.manufacturing.kicker}
            body={d.manufacturing.body}
            tags={d.manufacturing.tags}
            image="/media/divisions/manufacturing.webp"
            action={
              <Link to="/{-$locale}/services/manufacturing" params={params} className={actionClass}>
                {d.manufacturing.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={1}
            accent="var(--mustard)"
            accentText="var(--mustard-deep)"
            name={d.energy.name}
            kicker={d.energy.kicker}
            body={d.energy.body}
            tags={d.energy.tags}
            image="/media/divisions/energy.webp"
            action={
              <Link to="/{-$locale}/services/energy" params={params} className={actionClass}>
                {d.energy.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={2}
            accent="var(--teal)"
            accentText="var(--cyan-deep)"
            name={d.technology.name}
            kicker={d.technology.kicker}
            body={d.technology.body}
            tags={d.technology.tags}
            image="/media/divisions/technology.webp"
            action={
              <Link to="/{-$locale}/services/technology" params={params} className={actionClass}>
                {d.technology.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
          <Division
            index={3}
            accent="var(--industrial)"
            accentText="var(--steel)"
            name={d.threepl.name}
            kicker={d.threepl.kicker}
            body={d.threepl.body}
            tags={d.threepl.tags}
            image="/media/divisions/threepl.webp"
            action={
              <Link to="/{-$locale}/services/3pl" params={params} className={actionClass}>
                {d.threepl.cta}
                <span aria-hidden className="arrow-nudge">
                  →
                </span>
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
}
