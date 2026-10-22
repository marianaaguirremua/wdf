import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ThreePlCapabilities } from "@/components/threepl/ThreePlCapabilities";
import { ThreePlConnect } from "@/components/threepl/ThreePlConnect";
import { ThreePlCta } from "@/components/threepl/ThreePlCta";
import { ThreePlDeliverables } from "@/components/threepl/ThreePlDeliverables";
import { ThreePlHero } from "@/components/threepl/ThreePlHero";
import { ThreePlProcess } from "@/components/threepl/ThreePlProcess";

// Content quoted from the approved Spanish 3PL page (wdfintegrators.com/home/3pl);
// the English version is a translation pending approval and shows Draft markers.
export const Route = createFileRoute("/{-$locale}/3pl")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.threepl;
    return pageHead({ locale, path: "/3pl", ...meta });
  },
  component: Page,
});

function Page() {
  return (
    <>
      <ThreePlHero />
      <ThreePlCapabilities />
      <ThreePlDeliverables />
      <ThreePlProcess />
      <ThreePlConnect />
      <ThreePlCta />
    </>
  );
}
