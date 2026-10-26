import { createFileRoute } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { CONTACT_EMAIL, THREEPL_LOCATIONS } from "@/lib/site";
import { ContactForm } from "@/components/contact/ContactForm";

export const Route = createFileRoute("/{-$locale}/contact")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.contact;
    return pageHead({ locale, path: "/contact", ...meta });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  const c = t.contact;
  const info = [
    { label: c.info.headquarters, lines: THREEPL_LOCATIONS.mexicali.address },
    { label: c.info.usOffice, lines: THREEPL_LOCATIONS.yuma.address },
    { label: c.info.email, lines: [CONTACT_EMAIL], href: `mailto:${CONTACT_EMAIL}` },
    {
      label: c.info.phone,
      lines: [THREEPL_LOCATIONS.yuma.phone],
      href: `tel:${THREEPL_LOCATIONS.yuma.tel}`,
    },
  ];

  return (
    <section
      aria-labelledby="contact-title"
      className="relative isolate overflow-hidden bg-ink text-ink-foreground"
    >
      <div
        aria-hidden
        className="blueprint absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(80%_70%_at_70%_30%,#000,transparent)]"
      />
      <div aria-hidden className="column-rules -z-10" />
      <div className="container-wdf grid gap-14 pb-24 pt-[calc(var(--header-h)+3.5rem)] md:pb-32 lg:grid-cols-12 lg:gap-10 lg:pt-[calc(var(--header-h)+5rem)]">
        <div className="lg:col-span-5">
          <p className="label-mono fade-up text-primary">{c.eyebrow}</p>
          <h1 id="contact-title" className="display mt-6 text-[clamp(2.6rem,5.6vw,4.75rem)]">
            <span className="rise-line">
              <span>{c.title}</span>
            </span>
          </h1>
          <p
            className="fade-up mt-8 max-w-xl text-lg leading-relaxed text-ink-muted"
            style={{ "--d": "300ms" } as CSSProperties}
          >
            {c.body}
          </p>

          <dl
            className="fade-up mt-12 grid gap-8 border-t border-ink-border pt-10 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2"
            style={{ "--d": "450ms" } as CSSProperties}
          >
            {info.map(({ label, lines, href }) => (
              <div key={label}>
                <dt className="label-mono text-primary">{label}</dt>
                <dd className="mt-3 leading-relaxed text-ink-foreground/90">
                  {href ? (
                    <a href={href} className="break-words transition-colors hover:text-primary">
                      {lines[0]}
                    </a>
                  ) : (
                    lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="fade-up lg:col-span-7" style={{ "--d": "250ms" } as CSSProperties}>
          <div className="rounded-md border border-ink-border bg-ink-2/80 p-6 shadow-2xl backdrop-blur md:p-8">
            <div className="flex items-center gap-3 border-b border-ink-border pb-5">
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary text-[0.65rem] font-bold text-primary-foreground">
                RFQ
              </span>
              <div>
                <h2 className="text-xl font-semibold tracking-[-0.01em]">{c.form.title}</h2>
                <p className="text-sm text-ink-muted">{c.form.sub}</p>
              </div>
            </div>
            <div className="mt-6">
              <ContactForm />
            </div>
            <div className="mt-6 rounded-sm border border-primary/30 bg-primary/5 p-4">
              <p className="label-mono text-primary">{c.form.cadTitle}</p>
              <p className="mt-1 text-sm text-ink-foreground/85">{c.form.cadBody}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
