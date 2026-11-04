import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ThreePlCapabilities } from "@/components/threepl/ThreePlCapabilities";
import { ThreePlConnect } from "@/components/threepl/ThreePlConnect";
import { ThreePlCta } from "@/components/threepl/ThreePlCta";
import { ThreePlDeliverables } from "@/components/threepl/ThreePlDeliverables";
import { ThreePlProcess } from "@/components/threepl/ThreePlProcess";

// Content quoted from the approved English and Spanish 3PL page (wdfintegrators.com/home/3pl).
export const Route = createFileRoute("/{-$locale}/services_/3pl")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.threepl;
    return pageHead({ locale, path: "/services/3pl", ...meta });
  },
  component: Page,
});

function Page() {
  // 3PL-only palette: terracotta accent and sand (see .accent-terracotta in styles.css).
  // The page opens on "01 · Logistics services"; the cross-border intro, map, Why Yuma, plant
  // animation and "How we help you get established" are on the Home page.
  return (
    <div className="accent-terracotta">
      <ThreePlCapabilities />
      <ThreePlDeliverables />
      <ThreePlProcess />
      <ThreePlConnect />
      <ThreePlCta />
    </div>
  );
}
