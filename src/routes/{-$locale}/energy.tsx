import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { EnergyCapabilities } from "@/components/energy/EnergyCapabilities";
import { EnergyConnect } from "@/components/energy/EnergyConnect";
import { EnergyCta } from "@/components/energy/EnergyCta";
import { EnergyDeliverables } from "@/components/energy/EnergyDeliverables";
import { EnergyHero } from "@/components/energy/EnergyHero";
import { EnergyProcess } from "@/components/energy/EnergyProcess";

// Content quoted from the approved English and Spanish WDF Energy page
// (wdfintegrators.com/home/energy). A light page with mustard accents, unlike the dark divisions.
export const Route = createFileRoute("/{-$locale}/energy")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.energy;
    return pageHead({ locale, path: "/energy", ...meta });
  },
  component: Page,
});

function Page() {
  return (
    <>
      <EnergyHero />
      <EnergyCapabilities />
      <EnergyDeliverables />
      <EnergyProcess />
      <EnergyConnect />
      <EnergyCta />
    </>
  );
}
