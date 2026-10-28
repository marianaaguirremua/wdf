import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ENERGY_CONTACT } from "@/lib/site";
import { LightDivisionPage } from "@/components/division/LightDivisionPage";
import { Bolt } from "@/components/energy/Bolt";
import { SingleLineDiagram } from "@/components/energy/SingleLineDiagram";

// Content quoted from the approved English and Spanish WDF Energy page
// (wdfintegrators.com/home/energy). A light page with mustard accents and a lightning-bolt mark.
export const Route = createFileRoute("/{-$locale}/services_/energy")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.energy;
    return pageHead({ locale, path: "/services/energy", ...meta });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <LightDivisionPage
      id="energy"
      content={t.energy}
      accent="mustard"
      mark={Bolt}
      cardLabel="WDF Energy"
      drawing={<SingleLineDiagram label={t.energy.hero.drawingLabel} />}
      linked={["technology", "manufacturing"]}
      contact={ENERGY_CONTACT}
    />
  );
}
