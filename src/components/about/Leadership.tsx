import { useI18n } from "@/i18n";
import { DraftMark } from "@/components/site/Draft";
import { Reveal } from "@/components/site/Reveal";
import { LEADERSHIP_TEAM, initials, telHref, type TeamMember } from "@/lib/team";

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
            aria-label={`${t.about.team.call} ${member.name}: ${member.phone}`}
          >
            <PhoneIcon />
            <span className="tabular-nums">{member.phone}</span>
          </a>
          <a
            href={`mailto:${member.email}`}
            className={contactLink}
            aria-label={`${t.about.team.email} ${member.name}: ${member.email}`}
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

export function Leadership() {
  const { t } = useI18n();
  const c = t.about.team;

  return (
    <section
      id="leadership"
      aria-labelledby="leadership-title"
      className="scroll-mt-[var(--header-h)] bg-white text-paper-foreground"
    >
      <div className="container-wdf py-24 md:py-36">
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="flex items-start gap-4 lg:col-span-3 lg:flex-col">
            <p className="label-mono text-cyan-deep">{c.eyebrow}</p>
          </Reveal>
          <div className="lg:col-span-9">
            <Reveal as="h2" delay={80} className="display text-[clamp(2.25rem,5vw,4.25rem)]">
              <span id="leadership-title">{c.title}</span>
            </Reveal>
            <Reveal delay={160} className="mt-8 flex flex-wrap items-center gap-4">
              <p className="max-w-2xl text-lg leading-relaxed text-paper-muted md:text-[1.25rem]">
                {c.body}
              </p>
              <DraftMark className="text-paper-muted" />
            </Reveal>
          </div>
        </div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3 xl:grid-cols-4">
          {LEADERSHIP_TEAM.map((member, i) => (
            <MemberCard key={member.email} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
