import { createFileRoute } from "@tanstack/react-router";
import { getMessages, resolveLocale } from "@/i18n";
import { pageHead } from "@/lib/seo";
import { ThreePlEstablish } from "@/components/threepl/ThreePlEstablish";
import { ThreePlExpansion } from "@/components/threepl/ThreePlExpansion";
import { ThreePlMap } from "@/components/threepl/ThreePlHero";
import { ThreePlWhyYuma } from "@/components/threepl/ThreePlWhyYuma";
import { YumaPhotos } from "@/components/threepl/YumaPhotos";

// Why Yuma, Arizona, the border map, the Yuma photos, the cross-border operation and how WDF
// helps you get established; linked from Home's Yuma section.
export const Route = createFileRoute("/{-$locale}/yuma")({
  head: ({ params }) => {
    const locale = resolveLocale(params.locale);
    const meta = getMessages(locale).meta.yuma;
    return pageHead({ locale, path: "/yuma", ...meta });
  },
  component: Page,
});

function Page() {
  return (
    <div className="accent-terracotta">
      <ThreePlWhyYuma />
      <ThreePlMap />
      <YumaPhotos />
      <ThreePlExpansion />
      <ThreePlEstablish />
    </div>
  );
}
