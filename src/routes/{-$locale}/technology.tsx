import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale, useI18n } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { TECHNOLOGY_CONTACT } from "@/lib/site";
import { LightDivisionPage } from "@/components/division/LightDivisionPage";
import { Chip } from "@/components/technology/Chip";
import { ControlNetworkDiagram } from "@/components/technology/ControlNetworkDiagram";

// Content quoted from the approved English and Spanish WDF Technology page
// (wdfintegrators.com/home/technology). A light page with the logo's cyan and a chip mark.
export const Route = createFileRoute("/{-$locale}/technology")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.technology;
    return pageHead({ locale, path: "/technology", ...meta });
  },
  component: Page,
});

function Page() {
  const { t } = useI18n();
  return (
    <LightDivisionPage
      id="technology"
      content={t.technology}
      accent="cyan"
      mark={Chip}
      cardLabel="WDF Technology"
      drawing={<ControlNetworkDiagram label={t.technology.hero.drawingLabel} />}
      linked={["manufacturing", "energy"]}
      contact={TECHNOLOGY_CONTACT}
    />
  );
}
