import { Link } from "@tanstack/react-router";
import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { Reveal } from "@/components/site/Reveal";
import { LEADERSHIP_TEAM, initials, telHref, type TeamMember } from "@/lib/team";
import { cn } from "@/lib/utils";

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4 shrink-0">
      <path
        d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="size-4 shrink-0">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

const contactLink =
  "group/link flex min-w-0 items-center gap-2.5 text-sm text-paper-foreground/85 transition-colors hover:text-cyan-deep";

// No photos yet: each card leads with a monogram plate in the brand's drafting-grid style.
function MemberCard({ member, index }: { member: TeamMember; index: number }) {
  const { t } = useI18n();
  return (
    <Reveal
      as="article"
      delay={(index % 4) * 60}
      className="group flex flex-col overflow-hidden rounded-sm border border-paper-foreground/10 bg-white transition-[border-color,box-shadow] duration-300 hover:border-teal hover:shadow-[0_18px_40px_-24px_rgba(12,24,40,0.35)]"
    >
      <div className="relative isolate grid aspect-[4/3] place-items-center overflow-hidden bg-ink">
        <div
          aria-hidden
          className="blueprint absolute inset-0 -z-10 opacity-70 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-110"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_55%,color-mix(in_oklab,var(--teal)_28%,transparent),transparent)]"
        />
        <span aria-hidden className="display text-[3.5rem] font-semibold text-ink-foreground">
          {initials(member.name)}
        </span>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-teal transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
        />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-xl font-semibold leading-tight tracking-[-0.02em]">{member.name}</h3>
        <p className="mb-5 mt-2 text-sm leading-snug text-cyan-deep">{member.title}</p>
        <div className="mt-auto flex flex-col gap-2.5 border-t border-paper-foreground/10 pt-5">
          <a
            href={telHref(member.phone)}
            className={contactLink}
            aria-label={`${t.about.leadership.call} ${member.name}: ${member.phone}`}
          >
            <PhoneIcon />
            <span className="tabular-nums">{member.phone}</span>
          </a>
          <a
            href={`mailto:${member.email}`}
            className={contactLink}
            aria-label={`${t.about.leadership.email} ${member.name}: ${member.email}`}
          >
            <MailIcon />
            {/* Long addresses may wrap only before the "@", never mid-word. */}
            <span className="min-w-0 text-[0.8125rem]">
              {member.email.split("@")[0]}
              <wbr />@{member.email.split("@")[1]}
            </span>
          </a>
        </div>
      </div>
    </Reveal>
  );
}

/**
 * About-page entry to the team: the leadership illustration overlapping a teal panel with the
 * call to action. The full team lives on its own page (/about/team).
 */
export function LeadershipTeaser() {
  const { locale, t } = useI18n();
  const c = t.about.team;

  return (
    <section
      aria-labelledby="leadership-title"
      className="bg-white py-24 text-paper-foreground md:py-36"
    >
      <div className="container-wdf grid lg:grid-cols-12">
        <Reveal className="relative z-10 lg:col-[1/8] lg:row-[1] lg:self-start">
          <img
            src="/media/leadership-climb.webp"
            alt={c.visualLabel}
            width={2000}
            height={1125}
            loading="lazy"
            decoding="async"
            className="block aspect-[16/9] w-full bg-ink object-cover"
          />
        </Reveal>
        <Reveal
          delay={120}
          className="-mt-10 bg-teal px-6 pb-10 pt-20 text-ink sm:px-10 lg:col-[2/13] lg:row-[1] lg:mt-20 lg:grid lg:grid-cols-11 lg:px-0 lg:py-20"
        >
          <div className="lg:col-[8/12] lg:pr-14">
            <p className="label-mono text-ink/70">{c.eyebrow}</p>
            <h2 id="leadership-title" className="display mt-5 text-[clamp(2rem,3.4vw,3rem)]">
              {c.title}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">{c.body}</p>
            <ButtonLink
              to="/{-$locale}/about/team"
              params={{ locale: localeParam(locale) }}
              variant="ink"
              className="mt-10"
            >
              {c.cta}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** The leadership team page: header, then one card per person with direct phone and email. */
export function LeadershipDirectory() {
  const { locale, t } = useI18n();
  const c = t.about.leadership;

  return (
    <section
      aria-labelledby="leadership-title"
      className="relative isolate bg-paper text-paper-foreground"
    >
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 -z-10 h-[34rem] [background-image:linear-gradient(color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_oklab,var(--petroleum)_7%,transparent)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:linear-gradient(to_bottom,#000,transparent)]"
      />
      <div className="container-wdf pb-24 pt-[calc(var(--header-h)+4rem)] md:pb-36 md:pt-[calc(var(--header-h)+5.5rem)]">
        <Link
          to="/{-$locale}/about"
          params={{ locale: localeParam(locale) }}
          className="label-mono inline-flex items-center gap-2 text-paper-muted transition-colors hover:text-cyan-deep"
        >
          <span aria-hidden>←</span> {c.back}
        </Link>
        <p className="label-mono fade-up mt-10 text-cyan-deep">{c.eyebrow}</p>
        <h1
          id="leadership-title"
          className="display mt-6 max-w-4xl text-[clamp(2.5rem,5.6vw,5rem)] font-semibold"
        >
          <span className="rise-line">
            <span>{c.title}</span>
          </span>
        </h1>
        <p className="fade-up mt-8 max-w-2xl text-lg leading-relaxed text-paper-muted md:text-[1.25rem]">
          {c.body}
        </p>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 xl:grid-cols-4">
          {LEADERSHIP_TEAM.map((member, i) => (
            <MemberCard key={member.email} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
