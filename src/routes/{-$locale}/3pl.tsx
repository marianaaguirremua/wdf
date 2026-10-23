import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ThreePlCapabilities } from "@/components/threepl/ThreePlCapabilities";
import { ThreePlConnect } from "@/components/threepl/ThreePlConnect";
import { ThreePlCta } from "@/components/threepl/ThreePlCta";
import { ThreePlDeliverables } from "@/components/threepl/ThreePlDeliverables";
import { ThreePlHero } from "@/components/threepl/ThreePlHero";
import { ThreePlNetwork } from "@/components/threepl/ThreePlNetwork";
import { ThreePlProcess } from "@/components/threepl/ThreePlProcess";

// Content quoted from the approved English and Spanish 3PL page (wdfintegrators.com/home/3pl).
export const Route = createFileRoute("/{-$locale}/3pl")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.threepl;
    return pageHead({ locale, path: "/3pl", ...meta });
  },
  component: Page,
});

function Page() {
  // 3PL-only palette: terracotta accent and sand (see .accent-terracotta in styles.css).
  // Rhythm: navy hero, paper, white, navy, paper, white, navy-2 contact.
  return (
    <div className="accent-terracotta">
      <ThreePlHero />
      <ThreePlNetwork />
      <ThreePlCapabilities />
      <ThreePlDeliverables />
      <ThreePlProcess />
      <ThreePlConnect />
      <ThreePlCta />
    </div>
  );
}
