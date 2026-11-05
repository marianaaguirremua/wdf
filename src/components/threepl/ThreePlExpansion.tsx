import { localeParam, useI18n } from "@/i18n";
import { ButtonLink } from "@/components/site/Button";
import { PhotoSlot } from "@/components/site/PhotoSlot";
import { Reveal } from "@/components/site/Reveal";
import { PAGE_PHOTOS } from "@/lib/site";

// U.S. expansion: WDF's Yuma office helps international companies set up in the U.S. Southwest,
// with Mexicali as support on the Mexican side. The flags photo (cropped above the crowd, the same
// file as the 3PL customs card) sits under the title.
export function ThreePlExpansion() {
  const { locale, t } = useI18n();
  const e = t.threepl.expansion;
  const [lead, ...rest] = e.body;

  return (
    <section
      aria-labelledby="threepl-expansion-title"
      className="relative bg-paper text-paper-foreground"
    >
      <div className="container-wdf grid gap-12 py-24 md:py-32 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="label-mono inline-flex items-center gap-3 text-accent-deep">
              <span aria-hidden className="h-0.5 w-8 shrink-0 bg-accent" />
              {e.eyebrow}
            </p>
          </Reveal>
          <Reveal as="h2" delay={80} className="display mt-8 text-[clamp(2.25rem,4.4vw,4rem)]">
            <span id="threepl-expansion-title">
              {e.title[0]} <span className="block text-accent-deep">{e.title[1]}</span>
            </span>
          </Reveal>
          <Reveal delay={140} className="mt-10">
            <PhotoSlot
              photo={PAGE_PHOTOS["threepl-capability-4"]}
              className="aspect-[16/9] rounded-md shadow-[0_20px_50px_-20px_rgb(12_24_40/0.45)]"
            />
          </Reveal>
        </div>

        <Reveal delay={160} className="lg:col-span-5 lg:col-start-8 lg:pt-16">
          <p className="text-xl leading-relaxed text-paper-foreground md:text-[1.375rem]">{lead}</p>
          <div className="mt-8 flex flex-col gap-5 border-t border-accent/40 pt-8">
            {rest.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-paper-muted">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink
              to="/{-$locale}/contact"
              params={{ locale: localeParam(locale) }}
              variant="accent"
            >
              {e.primary}
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
