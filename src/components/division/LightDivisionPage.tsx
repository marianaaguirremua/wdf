import { Link } from "@tanstack/react-router";
import type { ComponentType, CSSProperties, ReactNode } from "react";
import { localeParam, useI18n, type Messages } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { DirectContact } from "@/components/site/DirectContact";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { DIVISION_PARTNERS, PAGE_PHOTOS, type DivisionContact } from "@/lib/site";
import { cn } from "@/lib/utils";

// Light division page (Energy, Technology): white and paper sections with one accent colour,
// set by an `.accent-*` class (see styles.css) and used through bg-accent / text-accent-deep.
// `layout` gives each page its own arrangement of the same content, with photo frames that
// read from PAGE_PHOTOS (src/lib/site.ts) and stay empty until a photo is added.

export type Accent = "mustard" | "cyan";
type Mark = ComponentType<{ className?: string | undefined }>;
type Content = Messages["energy"];
type LinkedDivision = "manufacturing" | "energy" | "technology" | "threepl";

const DIVISION_ROUTES = {
  manufacturing: "/{-$locale}/services/manufacturing",
  energy: "/{-$locale}/services/energy",
  technology: "/{-$locale}/services/technology",
  threepl: "/{-$locale}/services/3pl",
} as const;

const eyebrow = "inline-flex items-center gap-2 text-sm font-semibold text-accent-deep";
const sectionTitle = "heading text-[clamp(1.75rem,3vw,2.5rem)]";
const lead = "mt-5 max-w-2xl text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg";

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
    <div className="max-w-3xl">
      <Reveal as="p" className={eyebrow}>
        {label}
      </Reveal>
      <Reveal as="h2" delay={80} className={cn(sectionTitle, "mt-3")}>
        <span id={id}>{title}</span>
      </Reveal>
      {body && (
        <Reveal delay={160}>
          <p className={lead}>{body}</p>
        </Reveal>
      )}
    </div>
  );
}

function Hero({
  id,
  c,
  mark: Mark,
  layout,
}: {
  id: string;
  c: Content["hero"];
  mark: Mark;
  layout: Layout;
}) {
  const { locale, t } = useI18n();
  const photo = PAGE_PHOTOS[`${id}-hero`];
  return (
    <section
      aria-labelledby={`${id}-title`}
      className={cn(
        "relative isolate border-b border-paper-border",
        layout === "energy" ? "overflow-hidden bg-white" : "z-10 bg-paper",
      )}
    >
      <div
        className={cn(
          "container-wdf grid items-center gap-12 pt-[calc(var(--header-h)+3rem)] lg:grid-cols-12 lg:gap-12 lg:pt-[calc(var(--header-h)+4.5rem)]",
          layout === "energy" ? "pb-16 md:pb-20" : "pb-16 md:pb-20 lg:pb-0",
        )}
      >
        <div className={cn("lg:col-span-7", layout === "technology" && "lg:pb-24")}>
          <p className={cn(eyebrow, "fade-up")} style={{ "--d": "50ms" } as CSSProperties}>
            <Mark className="size-4 text-accent" />
            {c.eyebrow}
          </p>
          <h1
            id={`${id}-title`}
            className="heading fade-up mt-4 text-[clamp(2.25rem,4.2vw,3.5rem)]"
            style={{ "--d": "120ms" } as CSSProperties}
          >
            {c.title[0]}{" "}
            <span className="box-decoration-clone bg-[linear-gradient(transparent_62%,color-mix(in_oklab,var(--accent)_45%,transparent)_62%)]">
              {c.title[1]}
            </span>
          </h1>
          <p
            className="fade-up mt-6 max-w-[36rem] text-[1.0625rem] leading-relaxed text-paper-muted md:text-lg"
            style={{ "--d": "220ms" } as CSSProperties}
          >
            {c.body}
          </p>
          <ul
            className="fade-up mt-6 flex flex-wrap gap-2"
            style={{ "--d": "280ms" } as CSSProperties}
          >
            {c.tags.map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1.5 text-[0.8125rem] font-medium text-paper-foreground/85"
              >
                <span aria-hidden className="size-1.5 rounded-full bg-accent" />
                {tag}
              </li>
            ))}
          </ul>
          <div
            className="fade-up mt-9 flex flex-wrap items-center gap-x-8 gap-y-6"
            style={{ "--d": "340ms" } as CSSProperties}
          >
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="accent"
            >
              {c.primary}
            </ButtonLink>
            <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-3 sm:border-l sm:border-paper-foreground/15 sm:pl-8">
              <span className="text-sm text-paper-muted">{t.footer.partneredWith}</span>
              {DIVISION_PARTNERS.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  rel="noopener"
                  className="opacity-90 transition-opacity hover:opacity-100"
                >
                  <img
                    src={partner.logoColor}
                    alt={partner.name}
                    width={partner.heroWidth}
                    height={partner.heroHeight}
                    className={`${partner.heroSize} w-auto`}
                  />
                  <span className="sr-only">({t.footer.external})</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {layout === "energy" ? (
          // Framed photo with an accent block offset behind it.
          <div
            className="fade-up relative mx-auto w-full max-w-[30rem] pb-4 pr-4 lg:col-span-5 lg:max-w-none"
            style={{ "--d": "200ms" } as CSSProperties}
          >
            <span aria-hidden className="absolute inset-0 left-4 top-4 rounded-md bg-accent" />
            <PhotoSlot photo={photo} eager className="relative aspect-[4/5] rounded-md" />
          </div>
        ) : (
          // Tall photo that runs past the bottom of the hero into the next section.
          <div
            className="fade-up relative mx-auto w-full max-w-[30rem] lg:col-span-5 lg:-mb-40 lg:max-w-none lg:self-end"
            style={{ "--d": "200ms" } as CSSProperties}
          >
            <PhotoSlot
              photo={photo}
              eager
              className="aspect-[4/5] rounded-md shadow-[0_24px_60px_-24px_rgb(12_24_40/0.35)] ring-1 ring-paper-border"
            />
            <span
              aria-hidden
              className="absolute -left-3 top-10 h-24 w-1.5 rounded-full bg-accent"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function Capabilities({
  id,
  c,
  layout,
}: {
  id: string;
  c: Content["capabilities"];
  layout: Layout;
}) {
  return (
    <section
      aria-labelledby={`${id}-capabilities`}
      className={cn(
        "bg-white",
        layout === "technology" ? "pb-20 pt-20 md:pb-24 lg:pt-56" : "py-20 md:py-24",
      )}
    >
      <div className="container-wdf">
        <SectionHeader id={`${id}-capabilities`} label={c.eyebrow} title={c.title} body={c.body} />

        {layout === "energy" ? (
          // Zigzag: photo and text swap sides on every row.
          <ol className="mt-12 space-y-12 md:mt-16 md:space-y-16">
            {c.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                className="grid items-center gap-6 md:grid-cols-2 md:gap-12 lg:gap-16"
              >
                <PhotoSlot
                  photo={PAGE_PHOTOS[`${id}-capability-${i + 1}`]}
                  className={cn("aspect-[16/10] rounded-md", i % 2 === 1 && "md:order-2")}
                />
                <div className={cn(i % 2 === 1 && "md:order-1")}>
                  <span className="grid size-10 place-items-center rounded-full bg-accent-soft text-sm font-semibold text-accent-deep">
                    {i + 1}
                  </span>
                  {/* Anchor for links from the Services page (#energy-capability-1, …). */}
                  <h3
                    id={`${id}-capability-${i + 1}`}
                    className="heading mt-5 scroll-mt-[calc(var(--header-h)+6rem)] text-2xl md:text-[1.75rem]"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-[1.0625rem] leading-relaxed text-paper-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        ) : (
          // Cards with a photo on top, three to a row.
          <ul className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2 lg:grid-cols-3">
            {c.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delay={(i % 3) * 70}
                className="group flex flex-col overflow-hidden rounded-md border border-paper-border bg-white"
              >
                <PhotoSlot
                  photo={PAGE_PHOTOS[`${id}-capability-${i + 1}`]}
                  className="aspect-[16/10]"
                  imgClassName="transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <div className="relative flex-1 p-6 md:p-7">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                  />
                  {/* Anchor for links from the Services page (#technology-capability-1, …). */}
                  <h3
                    id={`${id}-capability-${i + 1}`}
                    className="heading scroll-mt-[calc(var(--header-h)+6rem)] text-xl"
                  >
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper-muted">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function Deliverables({
  id,
  c,
  layout,
}: {
  id: string;
  c: Content["deliverables"];
  layout: Layout;
}) {
  const photo = PAGE_PHOTOS[`${id}-deliverables`];
  const list = (
    <>
      <ol className="border-t border-paper-border">
        {c.items.map((item, i) => (
          <Reveal
            as="li"
            key={item}
            delay={60}
            className="group flex items-baseline gap-5 border-b border-paper-border py-5 md:py-6"
          >
            <span className="text-sm font-semibold text-accent-deep">{i + 1}</span>
            <span className="text-lg font-semibold leading-snug transition-colors group-hover:text-accent-deep md:text-xl">
              {item}
            </span>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={120}>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-paper-muted">{c.note}</p>
      </Reveal>
    </>
  );
  return (
    <section aria-labelledby={`${id}-deliverables`} className="bg-paper">
      <div className="container-wdf py-20 md:py-24">
        {layout === "energy" ? (
          // Photo beside the list.
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-5">
              <PhotoSlot photo={photo} className="aspect-[4/3] rounded-md lg:aspect-[4/5]" />
            </Reveal>
            <div className="lg:col-span-7">
              <SectionHeader id={`${id}-deliverables`} label={c.eyebrow} title={c.title} />
              <div className="mt-8">{list}</div>
            </div>
          </div>
        ) : (
          // Wide banner photo, then the list in two columns.
          <>
            <SectionHeader id={`${id}-deliverables`} label={c.eyebrow} title={c.title} />
            <Reveal delay={120} className="mt-10">
              <PhotoSlot photo={photo} className="aspect-[16/9] rounded-md sm:aspect-[21/8]" />
            </Reveal>
            <div className="mt-8 [&_ol]:grid [&_ol]:gap-x-10 md:[&_ol]:grid-cols-2">{list}</div>
          </>
        )}
      </div>
    </section>
  );
}

// Four steps in order on a soft accent band; the numbering is the sequence.
function Process({ id, c }: { id: string; c: Content["process"] }) {
  return (
    <section aria-labelledby={`${id}-process`} className="bg-accent-soft">
      <div className="container-wdf py-20 md:py-24">
        <SectionHeader id={`${id}-process`} label={c.eyebrow} title={c.title} body={c.body} />
        <ol className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 md:mt-14 lg:grid-cols-4">
          {c.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 90}>
              <div className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-full bg-accent font-mono text-xs font-semibold text-ink">
                  0{i + 1}
                </span>
                <span aria-hidden className="h-px flex-1 bg-accent/60" />
              </div>
              <h3 className="heading mt-5 text-xl">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-paper-muted">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const cardClass =
  "group flex items-center justify-between gap-6 rounded-md border border-paper-border bg-white p-7 transition-colors hover:border-accent md:p-8";

function CardText({ name, line }: { name: string; line: string }) {
  return (
    <span>
      <span className="heading block text-2xl">{name}</span>
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
      <div className="container-wdf py-20 md:py-24">
        <SectionHeader id={`${id}-connect`} label={c.eyebrow} title={c.title} />
        <Reveal delay={160} className="mt-10 grid gap-4 md:grid-cols-2">
          {linked.map((key) => (
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
          ))}
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
      <div className="container-wdf py-20 md:py-24">
        <Reveal as="p" className="text-sm font-semibold text-ink/80">
          {c.eyebrow}
        </Reveal>
        <div>
          <Reveal
            as="h2"
            delay={80}
            className="heading mt-3 max-w-3xl text-[clamp(1.75rem,3vw,2.5rem)]"
          >
            <span id={`${id}-cta`}>{c.title}</span>
          </Reveal>
          <Reveal
            delay={160}
            className="mt-8 grid gap-10 border-t border-ink/20 pt-8 md:grid-cols-9"
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

/** Which page arrangement to use: Energy (framed hero, zigzag) or Technology (overlap, cards). */
export type Layout = "energy" | "technology";

export function LightDivisionPage({
  id,
  content,
  accent,
  mark,
  layout,
  linked,
  contact,
}: {
  /** Prefix for section ids and PAGE_PHOTOS keys, e.g. "energy". */
  id: string;
  content: Content;
  accent: Accent;
  mark: Mark;
  layout: Layout;
  /** Other divisions for the "works with the others" cards, in order. */
  linked: readonly LinkedDivision[];
  contact?: DivisionContact;
}) {
  return (
    <div className={cn(`accent-${accent}`, "text-paper-foreground")}>
      <Hero id={id} c={content.hero} mark={mark} layout={layout} />
      <Capabilities id={id} c={content.capabilities} layout={layout} />
      <Deliverables id={id} c={content.deliverables} layout={layout} />
      <Process id={id} c={content.process} />
      <Connect id={id} c={content.connect} linked={linked} />
      <Cta id={id} c={content.cta} mark={mark} contact={contact} />
    </div>
  );
}
