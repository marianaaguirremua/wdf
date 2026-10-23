import { Link } from "@tanstack/react-router";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { localeParam, useI18n, type Messages } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { DirectContact } from "@/components/site/DirectContact";
import { Reveal } from "@/components/site/Reveal";
import { MANUFACTURING_URL, type DivisionContact } from "@/lib/site";
import { cn } from "@/lib/utils";

// Light division page (Energy, Technology): white and paper sections with one accent colour,
// set by an `.accent-*` class (see styles.css) and used through bg-accent / text-accent-deep.

export type Accent = "mustard" | "cyan";
type Mark = ComponentType<{ className?: string | undefined }>;
type Content = Messages["energy"];
type LinkedDivision = "manufacturing" | "energy" | "technology" | "threepl";

const DIVISION_ROUTES = {
  energy: "/{-$locale}/energy",
  technology: "/{-$locale}/technology",
  threepl: "/{-$locale}/3pl",
} as const;

const eyebrow = "label-mono inline-flex items-center gap-2 text-accent-deep";
const sectionTitle = "display text-[clamp(2.25rem,5vw,4.25rem)]";
const lead = "mt-8 max-w-2xl text-lg leading-relaxed text-paper-muted md:text-[1.25rem]";

function SectionHeader({
  id,
  label,
  title,
  body,
}: {
  id: string;
  label: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      <Reveal className="lg:col-span-3">
        <p className={eyebrow}>{label}</p>
      </Reveal>
      <div className="lg:col-span-9">
        <Reveal as="h2" delay={80} className={cn(sectionTitle, "max-w-4xl")}>
          <span id={id}>{title}</span>
        </Reveal>
        {body && (
          <Reveal delay={160}>
            <p className={lead}>{body}</p>
          </Reveal>
        )}
      </div>
    </div>
  );
}

function Hero({
  id,
  c,
  mark: Mark,
  drawing,
}: {
  id: string;
  c: Content["hero"];
  mark: Mark;
  drawing: ReactNode;
}) {
  const { locale } = useI18n();
  return (
    <section aria-labelledby={`${id}-title`} className="relative isolate overflow-hidden bg-white">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background-image:linear-gradient(color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(90%_80%_at_75%_40%,#000_25%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="absolute -right-40 -top-40 -z-10 size-[44rem] rounded-full bg-[radial-gradient(closest-side,var(--accent-soft),transparent)]"
      />

      <div className="container-wdf grid items-center gap-14 pb-20 pt-[calc(var(--header-h)+4.5rem)] md:pb-28 lg:grid-cols-12 lg:gap-8 lg:pt-[calc(var(--header-h)+6rem)]">
        <div className="lg:col-span-7">
          <p className={cn(eyebrow, "fade-up gap-2.5")} style={{ "--d": "50ms" } as CSSProperties}>
            <Mark className="size-4 text-accent" />
            {c.eyebrow}
          </p>
          <h1
            id={`${id}-title`}
            className="display mt-7 text-[clamp(2.6rem,6.2vw,5.6rem)] font-semibold"
          >
            {c.title.map((line, i) => (
              <span key={line} className="rise-line">
                <span style={{ "--i": i } as CSSProperties}>
                  {i ? (
                    <span className="box-decoration-clone bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--accent)_45%,transparent)_62%)]">
                      {line}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="fade-up mt-10 max-w-[36rem] text-[1.0625rem] leading-relaxed text-paper-muted md:text-xl"
            style={{ "--d": "600ms" } as CSSProperties}
          >
            {c.body}
          </p>
          <ul
            className="fade-up mt-8 flex flex-wrap gap-2"
            style={{ "--d": "700ms" } as CSSProperties}
          >
            {c.tags.map((tag) => (
              <li
                key={tag}
                className="label-mono inline-flex items-center gap-2 rounded-sm border border-paper-foreground/15 bg-white px-3 py-2 text-[0.65rem] text-paper-foreground/80"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {tag}
              </li>
            ))}
          </ul>
          <div className="fade-up mt-10" style={{ "--d": "800ms" } as CSSProperties}>
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="accent"
            >
              {c.primary}
            </ButtonLink>
          </div>
        </div>

        <div
          className="fade-up mx-auto aspect-[46/44] w-full max-w-[26rem] lg:col-span-5 lg:max-w-none"
          style={{ "--d": "400ms" } as CSSProperties}
        >
          {drawing}
        </div>
      </div>
    </section>
  );
}

function Capabilities({
  id,
  c,
  mark: Mark,
  cardLabel,
}: {
  id: string;
  c: Content["capabilities"];
  mark: Mark;
  cardLabel: string;
}) {
  return (
    <section aria-labelledby={`${id}-capabilities`} className="bg-paper">
      <div className="container-wdf py-24 md:py-36">
        <SectionHeader id={`${id}-capabilities`} label={c.eyebrow} title={c.title} body={c.body} />
        <div className="mt-16 grid gap-px overflow-hidden rounded-sm border border-paper-foreground/10 bg-paper-foreground/10 md:mt-20 md:grid-cols-2 lg:grid-cols-3">
          {c.items.map((item, i) => (
            <Reveal
              as="article"
              key={item.title}
              delay={(i % 3) * 70}
              className="group relative flex flex-col bg-white p-7 md:p-8"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
              />
              <span className={eyebrow}>
                <Mark className="size-3.5 text-accent" />0{i + 1} / {cardLabel}
              </span>
              <h3 className="mt-6 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">
                {item.title}
              </h3>
              <p className="mt-4 leading-relaxed text-paper-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Deliverables({ id, c }: { id: string; c: Content["deliverables"] }) {
  return (
    <section aria-labelledby={`${id}-deliverables`} className="bg-white">
      <div className="container-wdf py-24 md:py-36">
        <SectionHeader id={`${id}-deliverables`} label={c.eyebrow} title={c.title} />
        <div className="lg:ml-[25%]">
          <ol className="mt-16 border-t border-paper-foreground/15 md:mt-20">
            {c.items.map((item, i) => (
              <Reveal
                as="li"
                key={item}
                delay={60}
                className="group flex items-baseline gap-6 border-b border-paper-foreground/15 py-7 md:gap-10"
              >
                <span className="label-mono text-accent-deep">0{i + 1}</span>
                <span className="text-[1.5rem] font-semibold leading-tight tracking-[-0.02em] transition-colors group-hover:text-accent-deep md:text-[1.75rem]">
                  {item}
                </span>
              </Reveal>
            ))}
          </ol>
          <Reveal delay={120}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-paper-muted">{c.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

// Four steps in order on a soft accent band; the numbering is the sequence.
function Process({ id, c }: { id: string; c: Content["process"] }) {
  return (
    <section aria-labelledby={`${id}-process`} className="bg-accent-soft">
      <div className="container-wdf py-24 md:py-36">
        <SectionHeader id={`${id}-process`} label={c.eyebrow} title={c.title} body={c.body} />
        <ol className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {c.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90}>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-ink">
                  0{i + 1}
                </span>
                <span aria-hidden className="h-px flex-1 bg-accent/60" />
              </div>
              <h3 className="mt-6 text-[1.6rem] font-semibold leading-tight tracking-[-0.02em]">
                {step.title}
              </h3>
              <p className="mt-3 leading-relaxed text-paper-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const cardClass =
  "group flex items-center justify-between gap-6 rounded-sm border border-paper-foreground/15 bg-white p-7 transition-colors hover:border-accent md:p-8";

function CardText({ name, line }: { name: string; line: string }) {
  return (
    <span>
      <span className="block text-[1.75rem] font-semibold tracking-[-0.02em]">{name}</span>
      <span className="mt-2 block text-sm text-paper-muted">{line}</span>
    </span>
  );
}

// Links to the other WDF divisions: Manufacturing to its own site, the rest to their pages here.
function Connect({
  id,
  c,
  linked,
}: {
  id: string;
  c: Content["connect"];
  linked: readonly LinkedDivision[];
}) {
  const { locale, t } = useI18n();
  return (
    <section aria-labelledby={`${id}-connect`} className="bg-paper">
      <div className="container-wdf py-24 md:py-36">
        <SectionHeader id={`${id}-connect`} label={c.eyebrow} title={c.title} />
        <Reveal delay={160} className="mt-14 grid gap-4 md:grid-cols-2 lg:ml-[25%]">
          {linked.map((key) =>
            key === "manufacturing" ? (
              <a
                key={key}
                href={MANUFACTURING_URL}
                target="_blank"
                rel="noopener"
                className={cardClass}
              >
                <CardText
                  name={t.divisions.manufacturing.name}
                  line={t.divisionLines.manufacturing}
                />
                <span aria-hidden className="arrow-nudge arrow-nudge-diag text-xl text-accent-deep">
                  ↗
                </span>
                <span className="sr-only">({t.footer.external})</span>
              </a>
            ) : (
              <Link
                key={key}
                to={DIVISION_ROUTES[key]}
                params={{ locale: localeParam(locale) }}
                className={cardClass}
              >
                <CardText name={t.nav[key]} line={t.divisionLines[key]} />
                <span aria-hidden className="arrow-nudge text-xl text-accent-deep">
                  →
                </span>
              </Link>
            ),
          )}
        </Reveal>
      </div>
    </section>
  );
}

function Cta({
  id,
  c,
  mark: Mark,
  contact,
}: {
  id: string;
  c: Content["cta"];
  mark: Mark;
  contact?: DivisionContact | undefined;
}) {
  const { locale } = useI18n();
  return (
    <section
      aria-labelledby={`${id}-cta`}
      className="relative isolate overflow-hidden bg-accent text-ink"
    >
      <Mark className="absolute -right-16 -top-10 -z-10 h-[130%] w-auto text-white/25" />
      <div className="container-wdf grid gap-12 py-24 md:py-36 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-3">
          <p className="label-mono text-ink">{c.eyebrow}</p>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal
            as="h2"
            delay={80}
            className="display max-w-4xl text-[clamp(2.25rem,5.4vw,4.75rem)]"
          >
            <span id={`${id}-cta`}>{c.title}</span>
          </Reveal>
          <Reveal
            delay={160}
            className="mt-10 grid gap-10 border-t border-ink/20 pt-10 md:grid-cols-9"
          >
            <div className="md:col-span-5">
              <p className="text-lg leading-relaxed text-ink/80">{c.body}</p>
              {contact && (
                <DirectContact label={c.contact} contact={contact} tone="accent" className="mt-8" />
              )}
            </div>
            <div className="flex flex-col gap-3 md:col-span-4">
              <ButtonLink
                to="/{-$locale}/contact"
                params={{ locale: localeParam(locale) }}
                variant="ink"
              >
                {c.primary}
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function LightDivisionPage({
  id,
  content,
  accent,
  mark,
  cardLabel,
  drawing,
  linked,
  contact,
}: {
  /** Prefix for section ids, e.g. "energy". */
  id: string;
  content: Content;
  accent: Accent;
  mark: Mark;
  /** Shown on each capability card, e.g. "WDF Energy". */
  cardLabel: string;
  drawing: ReactNode;
  /** Other divisions for the "works with the others" cards, in order. */
  linked: readonly LinkedDivision[];
  contact?: DivisionContact;
}) {
  return (
    <div className={cn(`accent-${accent}`, "text-paper-foreground")}>
      <Hero id={id} c={content.hero} mark={mark} drawing={drawing} />
      <Capabilities id={id} c={content.capabilities} mark={mark} cardLabel={cardLabel} />
      <Deliverables id={id} c={content.deliverables} />
      <Process id={id} c={content.process} />
      <Connect id={id} c={content.connect} linked={linked} />
      <Cta id={id} c={content.cta} mark={mark} contact={contact} />
    </div>
  );
}
